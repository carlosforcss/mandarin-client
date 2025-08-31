import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSentences, useSentencesByCategory, useDeleteSentence } from '../lib/hooks'
import Filters from '../components/Filters'
import Pager from '../components/Pager'
import SentenceForm from '../components/SentenceForm'

function SentencesList() {
  const [skip, setSkip] = useState(0)
  const [categoryId, setCategoryId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  
  const limit = 20

  // Choose the appropriate query based on filters
  const query = categoryId
    ? useSentencesByCategory(categoryId, skip, limit)
    : useSentences(skip, limit)

  const { data: sentences = [], isLoading, error } = query
  const deleteSentence = useDeleteSentence()

  // Filter by search term locally
  const filteredSentences = searchTerm
    ? sentences.filter(sentence =>
        sentence.sentence_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sentence.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sentence.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sentences

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sentence?')) {
      deleteSentence.mutate(id)
    }
  }

  const handleFormSubmit = () => {
    setShowForm(false)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading sentences...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          Error loading sentences: {error.message}
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <SentenceForm
        onSubmit={handleFormSubmit}
        onCancel={() => setShowForm(false)}
        isLoading={false}
      />
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sentences</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Sentence
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryId || ''}
              onChange={(e) => setCategoryId(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Categories</option>
              {/* Categories would be loaded from useCategories hook */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sentences..."
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>

      {filteredSentences.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No sentences found</div>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {filteredSentences.map((sentence) => (
              <div key={sentence.id} className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <div className="text-xl font-medium text-gray-800 mb-2">
                    {sentence.sentence_text}
                  </div>
                  <div className="text-lg text-gray-600 mb-1">
                    {sentence.pinyin}
                  </div>
                  <div className="text-gray-700">
                    {sentence.meaning}
                  </div>
                </div>
                
                {sentence.category && (
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {sentence.category.name} (HSK {sentence.category.hsk_level})
                    </span>
                  </div>
                )}

                {sentence.hanzis && sentence.hanzis.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Associated Hanzis:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sentence.hanzis.map((hanzi) => (
                        <Link
                          key={hanzi.id}
                          to={`/hanzi/${hanzi.id}`}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm transition-colors"
                        >
                          {hanzi.hanzi_text} ({hanzi.pinyin})
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <Link
                    to={`/sentences/${sentence.id}`}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 text-sm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(sentence.id)}
                    disabled={deleteSentence.isPending}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 text-sm disabled:opacity-50"
                  >
                    {deleteSentence.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Pager
            currentPage={skip}
            totalItems={filteredSentences.length + skip + (filteredSentences.length === limit ? limit : 0)}
            itemsPerPage={limit}
            onPageChange={setSkip}
          />
        </>
      )}
    </div>
  )
}

export default SentencesList