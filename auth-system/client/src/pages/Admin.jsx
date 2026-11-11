import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Admin = () => {
  const { user, loading } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate('/login')
    // Redirect students away from admin panel
    if (!loading && user && user.role !== 'admin') navigate('/profile')
  }, [user, loading])

  if (loading || !user || user.role !== 'admin') return null

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-purple-600 text-white rounded-2xl p-8 mb-6 shadow">
          <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
          <p className="text-purple-200 text-sm">
            Welcome, {user.name}. You have full administrative access.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-400 mb-1">Your Role</p>
            <p className="text-2xl font-bold text-purple-600 capitalize">{user.role}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-400 mb-1">Access Level</p>
            <p className="text-2xl font-bold text-green-600">Full</p>
          </div>
        </div>

        {/* Info box */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-4">Admin Details</h2>
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
              <span className="text-sm px-3 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
          💡 To promote a student to admin, edit their <code>role</code> field directly in MongoDB Atlas.
        </div>

        <button
          onClick={() => navigate('/profile')}
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition"
        >
          ← Back to Profile
        </button>
      </div>
    </div>
  )
}

export default Admin
