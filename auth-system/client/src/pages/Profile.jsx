import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Profile = () => {
  const { user, logout, loading } = useApp()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  if (loading || !user) return null

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold mb-3">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          <span className={`mt-1 text-xs px-3 py-1 rounded-full font-medium ${
            user.role === 'admin'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {user.role}
          </span>
        </div>

        {/* Info */}
        <div className="divide-y divide-gray-100">
          <div className="flex justify-between py-3">
            <span className="text-sm text-gray-400">Name</span>
            <span className="text-sm text-gray-700 font-medium">{user.name}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-gray-400">Email</span>
            <span className="text-sm text-gray-700 font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-gray-400">Role</span>
            <span className="text-sm text-gray-700 font-medium capitalize">{user.role}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-gray-400">Member since</span>
            <span className="text-sm text-gray-700 font-medium">
              {new Date(user.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          {user.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2.5 font-medium transition"
            >
              Go to Admin Panel →
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2.5 font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
