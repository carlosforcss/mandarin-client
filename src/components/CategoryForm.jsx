import { useState, useEffect } from 'react'

function CategoryForm({ category, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    hsk_level: 1,
  })

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        hsk_level: category.hsk_level || 1,
      })
    }
  }, [category])

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

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {category ? 'Edit Collection' : 'Create New Collection'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Collection Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Enter collection name"
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

export default CategoryForm