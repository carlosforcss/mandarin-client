import { useState } from 'react'

const INITIALS = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w']

const FINALS = [
  'a', 'o', 'e', 'i', 'u', 'ü',
  'ai', 'ei', 'ui', 'ao', 'ou', 'iu',
  'ie', 'üe', 'er',
  'an', 'en', 'in', 'un', 'ün',
  'ang', 'eng', 'ing', 'ong',
]

const TONES = [
  { num: 1, label: 'ā' },
  { num: 2, label: 'á' },
  { num: 3, label: 'ǎ' },
  { num: 4, label: 'à' },
]

function PinyinSquare({ syllable, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center border-2 rounded-xl text-sm sm:text-base md:text-lg font-bold transition-colors cursor-pointer shadow-sm aspect-square w-full
        ${selected
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
        }`}
    >
      {syllable}
    </button>
  )
}

function Pinyin() {
  const [selectedInitial, setSelectedInitial] = useState(INITIALS[0])
  const [selectedFinal, setSelectedFinal] = useState(FINALS[0])
  const [selectedTone, setSelectedTone] = useState(1)

  return (
    <div className="py-2 space-y-4 mx-[5%] sm:mx-[8%] md:mx-[10%]">

      {/* Selection bar */}
      <div className="flex items-end gap-2 sm:gap-4 pb-3 border-b border-gray-200">
        {/* Initial */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Initial</span>
          <div className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-50 border-2 border-blue-300 rounded-xl text-base sm:text-xl font-bold text-blue-800 shadow-sm">
            {selectedInitial}
          </div>
        </div>

        {/* Final */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Final</span>
          <div className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-50 border-2 border-blue-300 rounded-xl text-base sm:text-xl font-bold text-blue-800 shadow-sm">
            {selectedFinal}
          </div>
        </div>

        <div className="self-stretch w-px bg-gray-200 mx-1" />

        {/* Tones */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Tone</span>
          <div className="flex gap-1.5 sm:gap-2">
            {TONES.map(({ num, label }) => (
              <button
                key={num}
                onClick={() => setSelectedTone(num)}
                className={`flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 rounded-xl text-base sm:text-lg md:text-xl font-bold transition-colors shadow-sm
                  ${selectedTone === num
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                  }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => {}}
              className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 rounded-xl text-base sm:text-lg md:text-xl font-bold transition-colors shadow-sm bg-white text-blue-800 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Initials grid — fewer cols on mobile = bigger squares */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Initials</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1.5 sm:gap-2">
          {INITIALS.map((s) => (
            <PinyinSquare
              key={s}
              syllable={s}
              selected={selectedInitial === s}
              onClick={() => setSelectedInitial(s)}
            />
          ))}
        </div>
      </section>

      {/* Finals grid */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Finals</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1.5 sm:gap-2">
          {FINALS.map((s) => (
            <PinyinSquare
              key={s}
              syllable={s}
              selected={selectedFinal === s}
              onClick={() => setSelectedFinal(s)}
            />
          ))}
        </div>
      </section>

    </div>
  )
}

export default Pinyin
