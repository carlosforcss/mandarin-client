import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HanziList from './pages/HanziList'
import HanziDetail from './pages/HanziDetail'
import Categories from './pages/Categories'
import Pinyin from './pages/Pinyin'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="container mx-auto px-4 py-4">
        <Routes>
          <Route path="/" element={<HanziList />} />
          <Route path="/hanzi" element={<HanziList />} />
          <Route path="/hanzi/:id" element={<HanziDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/pinyin" element={<Pinyin />} />
        </Routes>
      </main>
    </div>
  )
}

export default App