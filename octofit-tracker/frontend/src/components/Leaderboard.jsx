import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('leaderboard')
      .then((items) => {
        if (!ignore) {
          setLeaderboard(items)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load leaderboard.</p>
  }

  return (
    <div className="list-group shadow-sm">
      {leaderboard.map((entry) => (
        <article className="list-group-item d-flex justify-content-between align-items-center" key={entry._id ?? entry.userEmail}>
          <div>
            <h2 className="h6 mb-1">#{entry.rank} {entry.userEmail}</h2>
            <p className="mb-0 text-secondary small">Weekly streak: {entry.weeklyStreak}</p>
          </div>
          <span className="badge rounded-pill text-bg-success">{entry.points} pts</span>
        </article>
      ))}
    </div>
  )
}

export default Leaderboard
