import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const usersEndpoint = '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection(usersEndpoint, 'users')
      .then((items) => {
        if (!ignore) {
          setUsers(items)
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
    return <p className="text-secondary">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load users.</p>
  }

  return (
    <div className="row g-3">
      {users.map((user) => (
        <div className="col-md-6 col-xl-4" key={user._id ?? user.email}>
          <article className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">{user.name}</h2>
              <p className="card-text text-secondary mb-2">{user.email}</p>
              <span className="badge text-bg-primary me-2">{user.team}</span>
              <span className="badge text-bg-light">{user.role}</span>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Users
