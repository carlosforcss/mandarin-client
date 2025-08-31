import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Chinese Learning
          </Link>
          <div className="flex space-x-4">
            <Link 
              to="/hanzi" 
              className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              Hanzi
            </Link>
            <Link 
              to="/sentences" 
              className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              Sentences
            </Link>
            <Link 
              to="/categories" 
              className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav