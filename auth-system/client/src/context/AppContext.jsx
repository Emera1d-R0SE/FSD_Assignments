import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

// All API calls go to the backend via the Vite proxy
axios.defaults.baseURL = 'http://localhost:5000'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser]           = useState(null)
  const [token, setToken]         = useState(localStorage.getItem('token') || '')
  const [loading, setLoading]     = useState(true)   // true while restoring session

  // Save token + user, attach to axios
  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('token', userToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
  }

  const logout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  // On first load, restore session from saved token
  useEffect(() => {
    const restore = async () => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          const { data } = await axios.get('/api/auth/me')
          if (data.success) setUser(data.user)
          else logout()
        } catch {
          logout()
        }
      }
      setLoading(false)
    }
    restore()
  }, [])

  return (
    <AppContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
export default AppContext
