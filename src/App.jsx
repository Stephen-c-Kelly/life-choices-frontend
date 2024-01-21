import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Nav from './components/Nav'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

import './App.css'

const App = () => {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
