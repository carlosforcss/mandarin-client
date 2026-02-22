import { useQuery } from '@tanstack/react-query'
import { scoresAPI } from '../lib/api'

const MEDALS = ['🥇', '🥈', '🥉']

export default function ScoreModal({ gameSlug, onClose }) {
  const { data, isLoading } = useQuery({
    queryKey: ['scores', gameSlug],
    queryFn: () => scoresAPI.getLeaderboard(gameSlug).then(r => r.data),
    staleTime: 0,
  })

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">🏆 Leaderboard</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-500 text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-4 max-h-80 overflow-y-auto">
          {isLoading ? (
            <p className="text-center text-gray-400 text-sm py-4">Loading…</p>
          ) : !data?.length ? (
            <p className="text-center text-gray-400 text-sm py-4">No scores yet. Be the first!</p>
          ) : (
            <ol className="space-y-2">
              {data.map((entry, i) => (
                <li key={entry.id} className="flex items-center gap-3 py-1">
                  <span className="w-6 text-center text-base">
                    {i < 3 ? MEDALS[i] : <span className="text-xs text-gray-300 font-bold">{i + 1}</span>}
                  </span>
                  <span className="flex-1 text-sm font-medium text-gray-700 truncate">{entry.player}</span>
                  <span className="text-sm font-bold text-blue-600">{entry.score}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  )
}
