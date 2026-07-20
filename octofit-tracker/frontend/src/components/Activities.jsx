import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const activitiesEndpoint = '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection(activitiesEndpoint, 'activities')
      .then((items) => {
        if (!ignore) {
          setActivities(items)
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
    return <p className="text-secondary">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load activities.</p>
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Activity</th>
            <th>User</th>
            <th>Minutes</th>
            <th>Calories</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id ?? `${activity.userEmail}-${activity.activityDate}`}>
              <td>{activity.type}</td>
              <td>{activity.userEmail}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.caloriesBurned}</td>
              <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
