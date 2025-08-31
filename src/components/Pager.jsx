function Pager({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const currentPageNum = Math.floor(currentPage / itemsPerPage) + 1

  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []
    let l

    for (let i = Math.max(2, currentPageNum - delta); 
         i <= Math.min(totalPages - 1, currentPageNum + delta); 
         i++) {
      range.push(i)
    }

    if (currentPageNum - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPageNum + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPageNum) {
      onPageChange((page - 1) * itemsPerPage)
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - itemsPerPage)}
        disabled={currentPageNum === 1}
        className="px-3 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={page === '...'}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            page === currentPageNum
              ? 'bg-blue-600 text-white border border-blue-600'
              : page === '...'
              ? 'bg-white border border-gray-300 text-gray-400 cursor-default'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + itemsPerPage)}
        disabled={currentPageNum === totalPages}
        className="px-3 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}

export default Pager