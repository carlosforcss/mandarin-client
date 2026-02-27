import { useCategories } from '../lib/hooks'

function Filters({ 
  hsKLevel, 
  onHskChange, 
  categoryId, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange 
}) {
  const { data: categories = [] } = useCategories()

  const hskLevels = [1, 2, 3, 4, 5, 6]

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            HSK Level
          </label>
          <select
            value={hsKLevel || ''}
            onChange={(e) => onHskChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All Levels</option>
            {hskLevels.map(level => (
              <option key={level} value={level}>
                HSK {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Collection
          </label>
          <select
            value={categoryId || ''}
            onChange={(e) => onCategoryChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All Collections</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            value={searchTerm || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters