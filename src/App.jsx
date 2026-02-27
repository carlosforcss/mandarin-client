import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HanziList from './pages/HanziList'
import HanziDetail from './pages/HanziDetail'
import Categories from './pages/Categories'
import CollectionDetail from './pages/CollectionDetail'
import Pinyin from './pages/Pinyin'
import PlayPinyin from './pages/PlayPinyin'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="container mx-auto px-4 py-4">
        <Routes>
          <Route path="/" element={<Pinyin />} />
          <Route path="/hanzi" element={<HanziList />} />
          <Route path="/hanzi/:id" element={<HanziDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/collection/:id" element={<CollectionDetail />} />
          <Route path="/pinyin" element={<Pinyin />} />
          <Route path="/play-pinyin" element={<PlayPinyin />} />
        </Routes>
      </main>
    </div>
  )
}

export default App