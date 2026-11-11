import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Home = () => {
  const { user } = useApp()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4">🔐</div>
      <h1 className="text-4xl font-bold text-gray-800 mb-3">Auth System</h1>
      <p className="text-gray-400 max-w-md mb-8 text-sm leading-relaxed">
        A complete user authentication system with JWT tokens, bcrypt password hashing,
        and role-based access control — built with Node.js, Express and MongoDB.
      </p>

      {user ? (
        <div className="flex gap-3">
          <Link
            to="/profile"
            className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dull transition font-medium"
          >
            View Profile
          </Link>
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition font-medium"
            >
              Admin Panel
            </Link>
          )}
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/register"
            className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dull transition font-medium"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white text-gray-700 border border-gray-200 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Login
          </Link>
        </div>
      )}

      {/* Feature badges */}
      <div className="flex flex-wrap justify-center gap-2 mt-12">
        {['JWT Auth', 'bcrypt Hashing', 'Role-Based Access', 'MongoDB Atlas', 'Express API'].map(f => (
          <span key={f} className="text-xs bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full">
            {f}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Home
