import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { INITIALS, TONES, VALID_FINALS, toAudioFinal, randomPinyin } from '../lib/pinyin'
import { scoresAPI } from '../lib/api'
import ScoreModal from '../components/ScoreModal'

const MODES = [
  { key: 'bullet',  label: 'Bullet',  seconds: 60,  slug: 'pinyin-mania-bullet' },
  { key: 'rapid',   label: 'Rapid',   seconds: 120, slug: 'pinyin-mania-rapid' },
  { key: 'classic', label: 'Classic', seconds: 300, slug: 'pinyin-mania-classic' },
]
const DEFAULT_MODE = 'rapid'

function GameSquare({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center border rounded-md text-sm sm:text-base md:text-lg font-semibold transition-colors cursor-pointer aspect-square w-full bg-white text-blue-800 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
    >
      {label}
    </button>
  )
}

export default function PlayPinyin() {
  const [phase, setPhase] = useState('name-entry') // 'name-entry' | 'playing' | 'game-over'
  const [showScores, setShowScores] = useState(false)
  const [name, setName] = useState('')
  const [modeKey, setModeKey] = useState(DEFAULT_MODE)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [step, setStep] = useState('initial') // 'initial' | 'final' | 'tone'
  const [answer, setAnswer] = useState(null)
  const [selectedInitial, setSelectedInitial] = useState(null)
  const [feedback, setFeedback] = useState(null) // { correct, delta }
  const [history, setHistory] = useState([]) // { answer, picked, correct }

  const audioRef = useRef(null)
  const gameOverRef = useRef(false)
  const feedbackTimeoutRef = useRef(null)
  const scoreRef = useRef(0)
  const pendingInitialRef = useRef(null)
  const pendingFinalRef = useRef(null)

  const currentMode = MODES.find(m => m.key === modeKey)

  function playPinyinAudio(pinyin) {
    const audioFinal = toAudioFinal(pinyin.initial, pinyin.final)
    if (audioRef.current) audioRef.current.pause()
    audioRef.current = new Audio(`/pinyin/${pinyin.initial}${audioFinal}${pinyin.tone}.mp3`)
    audioRef.current.play().catch(() => {})
  }

  function startRound(pinyin) {
    setAnswer(pinyin)
    setSelectedInitial(null)
    setStep('initial')
    playPinyinAudio(pinyin)
  }

  function startGame() {
    gameOverRef.current = false
    scoreRef.current = 0
    setShowScores(false)
    setScore(0)
    setHistory([])
    setTimeLeft(currentMode.seconds)
    setPhase('playing')
    startRound(randomPinyin())
  }

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id)
          gameOverRef.current = true
          scoresAPI.submit(currentMode.slug, name, scoreRef.current)
            .finally(() => setShowScores(true))
          setPhase('game-over')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(feedbackTimeoutRef.current)
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

  function handleInitialClick(initial) {
    setSelectedInitial(initial)
    setStep('final')
  }

  function handleFinalClick(final, initial) {
    setStep('tone')
    pendingFinalRef.current = final
    pendingInitialRef.current = initial
  }

  function handleToneClick(tone) {
    const pickedInitial = pendingInitialRef.current
    const pickedFinal = pendingFinalRef.current
    const correct =
      pickedInitial === answer.initial &&
      pickedFinal === answer.final &&
      tone === answer.tone

    const delta = correct ? 5 : -1
    setScore(s => {
      const next = Math.max(0, s + delta)
      scoreRef.current = next
      return next
    })
    setHistory(h => [...h, { answer, picked: { initial: pickedInitial, final: pickedFinal, tone }, correct }])
    setFeedback({ correct, delta, answer })

    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback(null)
      if (!gameOverRef.current) startRound(randomPinyin())
    }, 1000)
  }

  // ── Name entry ───────────────────────────────────────────────────────────────
  if (phase === 'name-entry') {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">🎮 Pinyin Game</h1>
          <p className="text-gray-500 text-sm">Listen to the audio and pick the correct initial, final and tone.</p>

          {/* Mode selector */}
          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-gray-600">Mode</label>
            <div className="flex gap-2">
              {MODES.map(m => (
                <button
                  key={m.key}
                  onClick={() => setModeKey(m.key)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${
                    modeKey === m.key
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  <div>{m.label}</div>
                  <div className={`text-xs font-normal mt-0.5 ${modeKey === m.key ? 'text-blue-100' : 'text-gray-400'}`}>
                    {m.seconds < 60 ? `${m.seconds}s` : `${m.seconds / 60}min`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-gray-600">Your name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim() && startGame()}
              placeholder="Enter your name..."
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              autoFocus
            />
          </div>
          <button
            onClick={startGame}
            disabled={!name.trim()}
            className="w-full py-3 rounded-xl font-bold text-white transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Start Game
          </button>
        </div>
      </div>
    )
  }

  // ── Game over ─────────────────────────────────────────────────────────────────
  if (phase === 'game-over') {
    const correctAnswers = history.filter(h => h.correct)
    const wrongAnswers = history.filter(h => !h.correct)

    const formatPinyin = ({ initial, final, tone }) => {
      const toneLabel = TONES.find(t => t.num === tone)?.label ?? ''
      return `${initial}${final} ${toneLabel}`
    }

    return (
      <>
      <div className="flex flex-col items-center py-6 px-4 space-y-6">

        {/* Score card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center space-y-6">
          <div className="text-5xl">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800">Time's up, {name}!</h1>
          <div>
            <p className="text-gray-400 text-sm mb-1">You scored</p>
            <div className="text-6xl font-bold text-blue-600">{score}</div>
            <p className="text-gray-400 text-sm mt-1">points</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Play Again
            </button>
            <Link
              to="/pinyin"
              className="flex-1 py-3 rounded-xl font-bold text-blue-600 border-2 border-blue-200 hover:bg-blue-50 transition-colors text-center"
            >
              Back
            </Link>
          </div>
          <button
            onClick={() => setShowScores(true)}
            className="w-full py-2 text-sm font-semibold text-gray-400 hover:text-blue-600 transition-colors"
          >
            🏆 View Scores
          </button>
        </div>

        {/* Results */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Correct */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-3">
              ✓ Correct ({correctAnswers.length})
            </h2>
            {correctAnswers.length === 0 ? (
              <p className="text-sm text-gray-400">None</p>
            ) : (
              <ul className="space-y-1">
                {correctAnswers.map((h, i) => (
                  <li key={i} className="text-sm font-semibold text-gray-700">
                    {formatPinyin(h.answer)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Wrong */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-3">
              ✗ Wrong ({wrongAnswers.length})
            </h2>
            {wrongAnswers.length === 0 ? (
              <p className="text-sm text-gray-400">None</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {wrongAnswers.map((h, i) => (
                  <li key={i} className="py-2 text-sm">
                    <div className="flex items-center gap-1.5 text-red-400">
                      <button onClick={() => playPinyinAudio(h.picked)} className="text-xs opacity-60 hover:opacity-100 transition-opacity">🔊</button>
                      You: {formatPinyin(h.picked)}
                    </div>
                    <div className="flex items-center gap-1.5 text-green-600 font-semibold">
                      <button onClick={() => playPinyinAudio(h.answer)} className="text-xs opacity-60 hover:opacity-100 transition-opacity">🔊</button>
                      Correct: {formatPinyin(h.answer)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
      {showScores && <ScoreModal defaultSlug={currentMode.slug} onClose={() => setShowScores(false)} />}
      </>
    )
  }

  // ── Playing ───────────────────────────────────────────────────────────────────
  const validFinals = selectedInitial ? (VALID_FINALS[selectedInitial] ?? []) : []

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timerDisplay = minutes > 0
    ? `${minutes}:${String(seconds).padStart(2, '0')}`
    : `${timeLeft}s`

  return (
    <div className="py-2 space-y-4 mx-[5%] sm:mx-[8%] md:mx-[10%]">

      {/* Score + Timer */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-800">
          Score: <span className="text-blue-600">{score}</span>
        </div>
        <div className={`text-lg font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-600'}`}>
          ⏱ {timerDisplay}
        </div>
      </div>

      {/* Instruction + Replay */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
          {step === 'initial' && 'Pick the initial'}
          {step === 'final'   && 'Pick the final'}
          {step === 'tone'    && 'Pick the tone'}
        </p>
        <button
          onClick={() => answer && playPinyinAudio(answer)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
        >
          🔊 Replay
        </button>
      </div>

      {/* Grid area */}
      <div className="relative min-h-[6rem]">

        {/* Feedback overlay */}
        {feedback && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 rounded-xl gap-1">
            <div className={`text-6xl font-bold ${feedback.correct ? 'text-green-500' : 'text-red-500'}`}>
              {feedback.correct ? '✓' : '✗'}
            </div>
            <div className={`text-2xl font-bold ${feedback.correct ? 'text-green-500' : 'text-red-500'}`}>
              {feedback.delta > 0 ? '+5' : '-1'}
            </div>
            {!feedback.correct && (
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Correct answer</p>
                <p className="text-2xl font-bold text-gray-700">
                  {feedback.answer.initial}
                  <span className="text-blue-600">{feedback.answer.final}</span>
                  <span className="text-purple-500"> {TONES.find(t => t.num === feedback.answer.tone)?.label}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initials */}
        {step === 'initial' && (
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-12 gap-2">
            {INITIALS.map(s => (
              <GameSquare key={s} label={s} onClick={() => handleInitialClick(s)} />
            ))}
          </div>
        )}

        {/* Finals — only valid ones shown, invalid ones hidden */}
        {step === 'final' && (
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-12 gap-2">
            {validFinals.map(s => (
              <GameSquare key={s} label={s} onClick={() => handleFinalClick(s, selectedInitial)} />
            ))}
          </div>
        )}

        {/* Tones */}
        {step === 'tone' && (
          <div className="flex gap-3 justify-center pt-4">
            {TONES.map(({ num, label }) => (
              <button
                key={num}
                onClick={() => handleToneClick(num)}
                className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-xl text-2xl sm:text-3xl font-bold bg-white text-blue-800 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-sm"
              >
                {label}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
