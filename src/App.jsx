import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HanziList from './pages/HanziList'
import HanziDetail from './pages/HanziDetail'
import SentencesList from './pages/SentencesList'
import SentenceDetail from './pages/SentenceDetail'
import Categories from './pages/Categories'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HanziList />} />
          <Route path="/hanzi" element={<HanziList />} />
          <Route path="/hanzi/:id" element={<HanziDetail />} />
          <Route path="/sentences" element={<SentencesList />} />
          <Route path="/sentences/:id" element={<SentenceDetail />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </div>
  )
}

export default App