import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('workouts')
      .then((items) => {
        if (!ignore) {
          setWorkouts(items)
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
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load workouts.</p>
  }

  return (
    <div className="row g-3">
      {workouts.map((workout) => (
        <div className="col-md-6" key={workout._id ?? workout.name}>
          <article className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between gap-3">
                <h2 className="h5 card-title">{workout.name}</h2>
                <span className="badge text-bg-warning align-self-start">{workout.difficulty}</span>
              </div>
              <p className="card-text text-secondary">{workout.suggestedFor}</p>
              <p className="mb-0 small"><strong>{workout.focusArea}</strong> · {workout.durationMinutes} minutes</p>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Workouts
