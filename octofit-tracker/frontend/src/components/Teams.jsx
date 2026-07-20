import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('teams')
      .then((items) => {
        if (!ignore) {
          setTeams(items)
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
    return <p className="text-secondary">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load teams.</p>
  }

  return (
    <div className="row g-3">
      {teams.map((team) => (
        <div className="col-md-6 col-xl-4" key={team._id ?? team.name}>
          <article className="card h-100 border-success-subtle">
            <div className="card-body">
              <h2 className="h5 card-title">{team.name}</h2>
              <p className="card-text text-secondary">{team.mascot}</p>
              <dl className="row mb-0 small">
                <dt className="col-5">City</dt>
                <dd className="col-7">{team.city}</dd>
                <dt className="col-5">Members</dt>
                <dd className="col-7">{team.memberCount}</dd>
              </dl>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Teams
