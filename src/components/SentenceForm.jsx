import { useState, useEffect } from 'react'
import { useCategories, useHanzis } from '../lib/hooks'

function SentenceForm({ sentence, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    sentence_text: '',
    pinyin: '',
    meaning: '',
    category_id: null,
    hanzi_ids: [],
  })

  const { data: categories = [] } = useCategories()
  const { data: hanzis = [] } = useHanzis(0, 1000) // Get more hanzis for selection

  useEffect(() => {
    if (sentence) {
      setFormData({
        sentence_text: sentence.sentence_text || '',
        pinyin: sentence.pinyin || '',
        meaning: sentence.meaning || '',
        category_id: sentence.category?.id || null,
        hanzi_ids: sentence.hanzis?.map(h => h.id) || [],
      })
    }
  }, [sentence])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleHanziSelection = (hanziId) => {
    setFormData(prev => ({
      ...prev,
      hanzi_ids: prev.hanzi_ids.includes(hanziId)
        ? prev.hanzi_ids.filter(id => id !== hanziId)
        : [...prev.hanzi_ids, hanziId]
    }))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {sentence ? 'Edit Sentence' : 'Create New Sentence'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sentence Text *
          </label>
          <textarea
            value={formData.sentence_text}
            onChange={(e) => handleChange('sentence_text', e.target.value)}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter sentence"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pinyin *
          </label>
          <input
            type="text"
            value={formData.pinyin}
            onChange={(e) => handleChange('pinyin', e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter pinyin"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meaning *
          </label>
          <input
            type="text"
            value={formData.meaning}
            onChange={(e) => handleChange('meaning', e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter meaning"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category_id || ''}
            onChange={(e) => handleChange('category_id', e.target.value ? parseInt(e.target.value) : null)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">No Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Associated Hanzis
          </label>
          <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
            {hanzis.length === 0 ? (
              <div className="text-gray-500 text-sm">No hanzis available</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {hanzis.map(hanzi => (
                  <label
                    key={hanzi.id}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={formData.hanzi_ids.includes(hanzi.id)}
                      onChange={() => handleHanziSelection(hanzi.id)}
                      className="rounded"
                    />
                    <span className="text-sm">
                      {hanzi.hanzi_text} ({hanzi.pinyin})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {formData.hanzi_ids.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {formData.hanzi_ids.length} hanzi(s)
            </div>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default SentenceForm