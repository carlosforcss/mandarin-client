import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSentence, useUpdateSentence, useDeleteSentence } from '../lib/hooks'
import SentenceForm from '../components/SentenceForm'

function SentenceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  
  const { data: sentence, isLoading, error } = useSentence(id)
  const updateSentence = useUpdateSentence()
  const deleteSentence = useDeleteSentence()

  const handleUpdate = async (formData) => {
    updateSentence.mutate(
      { id: parseInt(id), data: formData },
      {
        onSuccess: () => {
          setIsEditing(false)
        }
      }
    )
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this sentence?')) {
      deleteSentence.mutate(parseInt(id), {
        onSuccess: () => {
          navigate('/sentences')
        }
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading sentence...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          Error loading sentence: {error.message}
        </div>
      </div>
    )
  }

  if (!sentence) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Sentence not found</div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <SentenceForm
        sentence={sentence}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        isLoading={updateSentence.isPending}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-start mb-6">
          <button
            onClick={() => navigate('/sentences')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Sentences
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteSentence.isPending}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {deleteSentence.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-2xl font-medium text-gray-800 mb-3">
            {sentence.sentence_text}
          </div>
          <div className="text-xl text-gray-600 mb-2">
            {sentence.pinyin}
          </div>
          <div className="text-lg text-gray-700">
            {sentence.meaning}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-600 mb-1">Sentence ID</div>
            <div className="text-lg font-semibold">{sentence.id}</div>
          </div>
          
          {sentence.category && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-1">Category</div>
              <div className="text-lg font-semibold">
                {sentence.category.name} (HSK {sentence.category.hsk_level})
              </div>
            </div>
          )}
        </div>

        {sentence.hanzis && sentence.hanzis.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Associated Hanzis ({sentence.hanzis.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sentence.hanzis.map((hanzi) => (
                <Link
                  key={hanzi.id}
                  to={`/hanzi/${hanzi.id}`}
                  className="bg-gray-50 hover:bg-gray-100 border rounded-lg p-4 text-center transition-colors"
                >
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {hanzi.hanzi_text}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {hanzi.pinyin}
                  </div>
                  <div className="text-xs text-gray-500">
                    {hanzi.meaning}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    HSK {hanzi.hsk_level}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {updateSentence.isError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="text-red-800">
              Error updating sentence: {updateSentence.error.message}
            </div>
          </div>
        )}

        {deleteSentence.isError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">
              Error deleting sentence: {deleteSentence.error.message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SentenceDetail