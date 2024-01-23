import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Nav from './components/Nav'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import ViewPost from './pages/ViewPost.jsx'
import * as authService from './services/authService.js'
import './App.css'
import CreatePost from './pages/CreatePost.jsx'

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())

  function handleLogout() {
    authService.logout()
    setUser(null)

  }

  function handleSignupOrLogin() {
    setUser(authService.getUser())
  }

  return (
    <>
      <Nav user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/newpost" element={<CreatePost/>}/>
        <Route path="/viewpost" element={<ViewPost/>}/>
      </Routes>
    </>
  )
}

export default App
