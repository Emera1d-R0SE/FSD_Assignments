import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Navbar = () => {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-primary">
        🔐 AuthSystem
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/profile" className="text-gray-600 hover:text-primary transition">
              Profile
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-primary transition">
                Admin
              </Link>
            )}
            <span className="text-sm text-gray-400">
              👤 {user.name}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                user.role === 'admin'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {user.role}
              </span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-primary transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-dull transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
