import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../lib/hooks'
import Pager from '../components/Pager'

function Categories() {
  const navigate = useNavigate()
  const [skip, setSkip] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterHsk, setFilterHsk] = useState(null)

  const limit = 20

  const { data: categories = [], isLoading, error } = useCategories(skip, limit)

  // Filter categories locally
  const filteredCategories = categories.filter(category => {
    const matchesSearch = !searchTerm ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHsk = !filterHsk || category.hsk_level === filterHsk
    return matchesSearch && matchesHsk
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading collections...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          Error loading collections: {error.message}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Collections
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by collection name..."
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by HSK Level
            </label>
            <select
              value={filterHsk || ''}
              onChange={(e) => setFilterHsk(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All HSK Levels</option>
              {[1, 2, 3, 4, 5, 6].map(level => (
                <option key={level} value={level}>HSK {level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No collections found</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div key={category.id} onClick={() => navigate(`/collection/${category.id}`)} className="bg-white rounded-lg shadow p-6 cursor-pointer hover:bg-blue-50 hover:shadow-md transition-all">
                <div className="text-xl font-semibold text-gray-800 mb-2">
                  {category.name}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>HSK {category.hsk_level}</span>
                  <span>ID: {category.id}</span>
                </div>
              </div>
            ))}
          </div>

          <Pager
            currentPage={skip}
            totalItems={filteredCategories.length + skip + (filteredCategories.length === limit ? limit : 0)}
            itemsPerPage={limit}
            onPageChange={setSkip}
          />
        </>
      )}
    </div>
  )
}

export default Categories