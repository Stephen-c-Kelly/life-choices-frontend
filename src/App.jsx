import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Nav from './components/Nav'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import * as authService from './services/authService.js'
import './App.css'

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())

  function handleLogout(){
    authService.logout()
    setUser(null)
    navigate('/')
  }

  function handleSignupOrLogin(){
    setUser(authService.getUser())
  }
  return (
    <>
      <Nav user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile user={user}/>}/>
      </Routes>
    </>
  )
}

export default App
