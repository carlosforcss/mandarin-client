import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCategory, useHanzisByCategory, useHanziSpeech } from '../lib/hooks'
import Pager from '../components/Pager'

function CollectionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [skip, setSkip] = useState(0)
  const limit = 50

  const { data: collection, isLoading: loadingCollection, error: collectionError } = useCategory(parseInt(id))
  const { data: hanzis = [], isLoading: loadingHanzis, error: hanzisError } = useHanzisByCategory(parseInt(id), null, skip, limit)
  const hanziSpeech = useHanziSpeech()

  if (loadingCollection || loadingHanzis) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (collectionError || hanzisError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          Error loading collection: {(collectionError || hanzisError).message}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/categories')}
          className="text-blue-600 hover:text-blue-800 mb-4 block"
        >
          ← Back to Collections
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{collection?.name}</h1>
        {collection && (
          <div className="text-sm text-gray-500 mt-1">HSK {collection.hsk_level}</div>
        )}
      </div>

      {hanzis.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No hanzis in this collection</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hanzis.map((hanzi) => (
              <div key={hanzi.id} onClick={() => hanziSpeech.mutate(hanzi.id)} className="bg-white rounded-lg shadow p-6 cursor-pointer hover:bg-blue-50 hover:shadow-md transition-all">
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
                <div className="text-sm text-gray-500 text-center">
                  HSK {hanzi.hsk_level}
                </div>
              </div>
            ))}
          </div>

          <Pager
            currentPage={skip}
            totalItems={hanzis.length + skip + (hanzis.length === limit ? limit : 0)}
            itemsPerPage={limit}
            onPageChange={setSkip}
          />
        </>
      )}
    </div>
  )
}

export default CollectionDetail
