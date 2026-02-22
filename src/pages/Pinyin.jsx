import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { INITIALS, FINALS, TONES, VALID_FINALS, toAudioFinal } from '../lib/pinyin'

function PinyinSquare({ syllable, selected, disabled, onClick }) {
  if (disabled) {
    return (
      <div className="flex items-center justify-center border rounded-md text-xs sm:text-sm md:text-base font-semibold aspect-square w-full opacity-25 bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed select-none">
        {syllable}
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center border rounded-md text-xs sm:text-sm md:text-base font-semibold transition-colors cursor-pointer aspect-square w-full
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
  const audioRef = useRef(null)

  function playAudio(initial, final, tone) {
    if (audioRef.current) audioRef.current.pause()
    const audioFinal = toAudioFinal(initial, final)
    audioRef.current = new Audio(`/pinyin/${initial}${audioFinal}${tone}.mp3`)
    audioRef.current.play().catch(() => {})
  }

  function handleInitialClick(initial) {
    const valid = new Set(VALID_FINALS[initial] ?? FINALS)
    let final = selectedFinal
    if (!valid.has(final)) {
      final = FINALS.find(f => valid.has(f)) ?? selectedFinal
    }
    setSelectedInitial(initial)
    setSelectedFinal(final)
    playAudio(initial, final, selectedTone)
  }

  const validForCurrent = new Set(VALID_FINALS[selectedInitial] ?? FINALS)

  return (
    <div className="py-2 space-y-4 mx-[5%] sm:mx-[8%] md:mx-[10%]">

      {/* Selection bar */}
      <div className="flex items-end gap-2 sm:gap-4 pb-3 border-b border-gray-200">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Initial</span>
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-50 border-2 border-blue-300 rounded-lg text-sm sm:text-base font-bold text-blue-800 shadow-sm">
            {selectedInitial}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Final</span>
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-50 border-2 border-blue-300 rounded-lg text-sm sm:text-base font-bold text-blue-800 shadow-sm">
            {selectedFinal}
          </div>
        </div>

        <div className="self-stretch w-px bg-gray-200 mx-1" />

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Tone</span>
          <div className="flex gap-1.5 sm:gap-2">
            {TONES.map(({ num, label }) => (
              <button
                key={num}
                onClick={() => { setSelectedTone(num); playAudio(selectedInitial, selectedFinal, num) }}
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 rounded-lg text-sm sm:text-base font-bold transition-colors shadow-sm
                  ${selectedTone === num
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                  }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => playAudio(selectedInitial, selectedFinal, selectedTone)}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 rounded-lg text-sm sm:text-base font-bold transition-colors shadow-sm bg-white text-blue-800 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Initials grid */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Initials</h2>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-[16] gap-1">
          {INITIALS.map((s) => (
            <PinyinSquare
              key={s}
              syllable={s}
              selected={selectedInitial === s}
              onClick={() => handleInitialClick(s)}
            />
          ))}
        </div>
      </section>

      {/* Finals grid */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Finals</h2>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-[16] gap-1">
          {FINALS.map((s) => (
            <PinyinSquare
              key={s}
              syllable={s}
              selected={selectedFinal === s}
              disabled={!validForCurrent.has(s)}
              onClick={() => { setSelectedFinal(s); playAudio(selectedInitial, s, selectedTone) }}
            />
          ))}
        </div>
      </section>

      {/* Let's Play */}
      <div className="pt-4 flex justify-center">
        <Link
          to="/play-pinyin"
          className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg transition-colors shadow"
        >
          Let's Play 🎮
        </Link>
      </div>

    </div>
  )
}

export default Pinyin
