import { useState, useEffect } from 'react'
import { useCategories } from '../lib/hooks'
import FileUpload from './FileUpload'

function HanziForm({ hanzi, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    hanzi_text: '',
    pinyin: '',
    meaning: '',
    hsk_level: 1,
    category_id: null,
    image_file_id: null,
  })

  const { data: categories = [] } = useCategories()

  useEffect(() => {
    if (hanzi) {
      setFormData({
        hanzi_text: hanzi.hanzi_text || '',
        pinyin: hanzi.pinyin || '',
        meaning: hanzi.meaning || '',
        hsk_level: hanzi.hsk_level || 1,
        category_id: hanzi.category_id || null,
        image_file_id: hanzi.image_file_id || null,
      })
    }
  }, [hanzi])

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

  const handleFileUploaded = (file) => {
    setFormData(prev => ({
      ...prev,
      image_file_id: file.id
    }))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {hanzi ? 'Edit Hanzi' : 'Create New Hanzi'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hanzi Text *
          </label>
          <input
            type="text"
            value={formData.hanzi_text}
            onChange={(e) => handleChange('hanzi_text', e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter hanzi character"
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
            HSK Level *
          </label>
          <select
            value={formData.hsk_level}
            onChange={(e) => handleChange('hsk_level', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {[1, 2, 3, 4, 5, 6].map(level => (
              <option key={level} value={level}>HSK {level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Collection
          </label>
          <select
            value={formData.category_id || ''}
            onChange={(e) => handleChange('category_id', e.target.value ? parseInt(e.target.value) : null)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">No Collection</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <FileUpload onFileUploaded={handleFileUploaded} />
          {formData.image_file_id && (
            <div className="mt-2 text-sm text-green-600">
              Image uploaded (ID: {formData.image_file_id})
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

export default HanziForm