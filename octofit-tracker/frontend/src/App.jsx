import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl } from './api'
import './App.css'

const navigationItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <header className="border-bottom bg-white">
        <div className="container py-4">
          <p className="text-uppercase text-success fw-semibold small mb-2">OctoFit Tracker</p>
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
            <div>
              <h1 className="display-6 mb-2">Team fitness command center</h1>
              <p className="text-secondary mb-0">Live data from the OctoFit API.</p>
            </div>
            <div className="api-chip align-self-lg-end">
              <span className="text-secondary">API</span>
              <code>{apiBaseUrl}</code>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <nav className="nav nav-pills gap-2 mb-4" aria-label="OctoFit sections">
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <section className="content-panel bg-white p-4 shadow-sm">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default App
