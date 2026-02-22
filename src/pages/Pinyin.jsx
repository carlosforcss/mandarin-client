const INITIALS = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w']

const FINALS = [
  'a', 'o', 'e', 'i', 'u', 'ü',
  'ai', 'ei', 'ui', 'ao', 'ou', 'iu',
  'ie', 'üe', 'er',
  'an', 'en', 'in', 'un', 'ün',
  'ang', 'eng', 'ing', 'ong',
]

function PinyinSquare({ syllable }) {
  return (
    <button className="flex items-center justify-center bg-white border-2 border-blue-200 rounded-xl text-base sm:text-lg md:text-xl font-bold text-blue-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors cursor-pointer shadow-sm aspect-square w-full">
      {syllable}
    </button>
  )
}

function Pinyin() {
  return (
    <div className="py-4 space-y-6 mx-[5%] sm:mx-[8%] md:mx-[10%]">
      <section>
        <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 sm:mb-3">Initials</h2>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-3">
          {INITIALS.map((s) => (
            <PinyinSquare key={s} syllable={s} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 sm:mb-3">Finals</h2>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-3">
          {FINALS.map((s) => (
            <PinyinSquare key={s} syllable={s} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Pinyin
