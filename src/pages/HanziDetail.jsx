import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHanzi, useUpdateHanzi, useDeleteHanzi, useFile } from '../lib/hooks'
import HanziForm from '../components/HanziForm'

function HanziDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  
  const { data: hanzi, isLoading, error } = useHanzi(id)
  const { data: imageFile } = useFile(hanzi?.image_file_id)
  const updateHanzi = useUpdateHanzi()
  const deleteHanzi = useDeleteHanzi()

  const handleUpdate = async (formData) => {
    updateHanzi.mutate(
      { id: parseInt(id), data: formData },
      {
        onSuccess: () => {
          setIsEditing(false)
        }
      }
    )
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this hanzi?')) {
      deleteHanzi.mutate(parseInt(id), {
        onSuccess: () => {
          navigate('/hanzi')
        }
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading hanzi...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          Error loading hanzi: {error.message}
        </div>
      </div>
    )
  }

  if (!hanzi) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Hanzi not found</div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <HanziForm
        hanzi={hanzi}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        isLoading={updateHanzi.isPending}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-start mb-6">
          <button
            onClick={() => navigate('/hanzi')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Hanzis
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
              disabled={deleteHanzi.isPending}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {deleteHanzi.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4">
            {hanzi.hanzi_text}
          </div>
          <div className="text-2xl text-gray-600 mb-2">
            {hanzi.pinyin}
          </div>
          <div className="text-xl text-gray-800">
            {hanzi.meaning}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-600 mb-1">HSK Level</div>
            <div className="text-lg font-semibold">HSK {hanzi.hsk_level}</div>
          </div>
          
          {hanzi.category_id && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-1">Collection ID</div>
              <div className="text-lg font-semibold">{hanzi.category_id}</div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-600 mb-1">Hanzi ID</div>
            <div className="text-lg font-semibold">{hanzi.id}</div>
          </div>
          
          {hanzi.image_file_id && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-1">Image File</div>
              <div className="text-lg font-semibold">
                ID: {hanzi.image_file_id}
                {imageFile && (
                  <div className="text-sm text-gray-500 mt-1">
                    {imageFile.name}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {updateHanzi.isError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="text-red-800">
              Error updating hanzi: {updateHanzi.error.message}
            </div>
          </div>
        )}

        {deleteHanzi.isError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">
              Error deleting hanzi: {deleteHanzi.error.message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HanziDetail