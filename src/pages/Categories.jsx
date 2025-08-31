import { useState } from 'react'
import { useCategories, useDeleteCategory } from '../lib/hooks'
import CategoryForm from '../components/CategoryForm'
import Pager from '../components/Pager'

function Categories() {
  const [skip, setSkip] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterHsk, setFilterHsk] = useState(null)
  
  const limit = 20

  const { data: categories = [], isLoading, error } = useCategories(skip, limit)
  const deleteCategory = useDeleteCategory()

  // Filter categories locally
  const filteredCategories = categories.filter(category => {
    const matchesSearch = !searchTerm || 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHsk = !filterHsk || category.hsk_level === filterHsk
    return matchesSearch && matchesHsk
  })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory.mutate(id)
    }
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setEditingCategory(null)
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading categories...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">
          Error loading categories: {error.message}
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <CategoryForm
        category={editingCategory}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setShowForm(false)
          setEditingCategory(null)
        }}
        isLoading={false}
      />
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Category
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Categories
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by category name..."
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
          <div className="text-gray-500 text-lg">No categories found</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <div className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>HSK {category.hsk_level}</span>
                    <span>ID: {category.id}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    disabled={deleteCategory.isPending}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 text-sm disabled:opacity-50"
                  >
                    {deleteCategory.isPending ? 'Deleting...' : 'Delete'}
                  </button>
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