import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHanzis, useHanzisByHSK, useHanzisByCategory, useDeleteHanzi } from '../lib/hooks'
import Filters from '../components/Filters'
import Pager from '../components/Pager'
import HanziForm from '../components/HanziForm'

function HanziList() {
  const [skip, setSkip] = useState(0)
  const [hsKLevel, setHsKLevel] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  
  const limit = 20

  // Choose the appropriate query based on filters
  let query
  if (categoryId) {
    query = useHanzisByCategory(categoryId, hsKLevel, skip, limit)
  } else if (hsKLevel) {
    query = useHanzisByHSK(hsKLevel, skip, limit)
  } else {
    query = useHanzis(skip, limit)
  }

  const { data: hanzis = [], isLoading, error } = query
  const deleteHanzi = useDeleteHanzi()

  // Filter by search term locally
  const filteredHanzis = searchTerm
    ? hanzis.filter(hanzi =>
        hanzi.hanzi_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hanzi.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hanzi.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : hanzis

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hanzi?')) {
      deleteHanzi.mutate(id)
    }
  }

  const handleFormSubmit = () => {
    setShowForm(false)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading hanzis...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          Error loading hanzis: {error.message}
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <HanziForm
        onSubmit={handleFormSubmit}
        onCancel={() => setShowForm(false)}
        isLoading={false}
      />
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hanzis</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Hanzi
        </button>
      </div>

      <Filters
        hsKLevel={hsKLevel}
        onHskChange={setHsKLevel}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {filteredHanzis.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No hanzis found</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHanzis.map((hanzi) => (
              <div key={hanzi.id} className="bg-white rounded-lg shadow p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {hanzi.hanzi_text}
                  </div>
                  <div className="text-lg text-gray-600 mb-1">
                    {hanzi.pinyin}
                  </div>
                  <div className="text-gray-800">
                    {hanzi.meaning}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>HSK {hanzi.hsk_level}</span>
                  {hanzi.category_id && (
                    <span>Category ID: {hanzi.category_id}</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <Link
                    to={`/hanzi/${hanzi.id}`}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 text-sm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(hanzi.id)}
                    disabled={deleteHanzi.isPending}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 text-sm disabled:opacity-50"
                  >
                    {deleteHanzi.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pager
            currentPage={skip}
            totalItems={filteredHanzis.length + skip + (filteredHanzis.length === limit ? limit : 0)}
            itemsPerPage={limit}
            onPageChange={setSkip}
          />
        </>
      )}
    </div>
  )
}

export default HanziList