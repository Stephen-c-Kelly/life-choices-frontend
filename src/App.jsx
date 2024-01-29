import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Nav from './components/nav/Nav.jsx'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './components/profile/ProfileComponent.jsx'
import UserProfile from './pages/UserProfile.jsx'
import ViewPost from './pages/ViewPost.jsx'
import ProtectedRoute from './components/protectedRoutes/ProtectedRoutes.jsx'
import * as authService from './services/authService.js'
import './App.css'
import CreatePost from './pages/CreatePost.jsx'
import { getUserFromToken } from './services/tokenService.js'

const App = () => {
  const [user, setUser] = useState()
  const [loggedIn, setLoggedIn] = useState(authService.getUser())

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            // Get user from token
            const loggedInUser = getUserFromToken();
            setUser(loggedInUser);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };
    fetchUserProfile();
}, []);

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
        <Route path="/" element={<Login handleSignupOrLogin={handleSignupOrLogin}/>}/>
        <Route path="/signup" element={<Signup/>}/>
      
      <Route 
      path="/homepage" 
      element={<ProtectedRoute loggedIn={loggedIn}>
      <Homepage/>
      </ProtectedRoute>
      }/>
      <Route 
        path="/newpost" 
        element={
        <ProtectedRoute loggedIn={loggedIn}>
        <CreatePost/>
        </ProtectedRoute>}/>
        <Route 
        path="/viewpost/:id" 
        element={
        <ProtectedRoute loggedIn={loggedIn}>
        <ViewPost user={user}/>
        </ProtectedRoute>}/>
        <Route 
        path="/profile" 
        element={
        <ProtectedRoute loggedIn={loggedIn}>
        <Profile user={user}/>
        </ProtectedRoute>}/>
        <Route 
        path="/profile/:id" 
        element={
        <ProtectedRoute loggedIn={loggedIn}>
        <UserProfile user={user}/>
        </ProtectedRoute>}/>
        </Routes>
    </>
  )
}

export default App
