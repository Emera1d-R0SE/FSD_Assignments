import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

import Navbar  from './components/Navbar'
import Home    from './pages/Home'
import Register from './pages/Register'
import Login   from './pages/Login'
import Profile from './pages/Profile'
import Admin   from './pages/Admin'

const App = () => {
  return (
    <AppProvider>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/profile"  element={<Profile />} />
        <Route path="/admin"    element={<Admin />} />
      </Routes>
    </AppProvider>
  )
}

export default App
