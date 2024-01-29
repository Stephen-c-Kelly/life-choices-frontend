import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ loggedIn, children }) => {
    if (!loggedIn) { return <Navigate to="/" /> }
    return children
  
}

export default ProtectedRoute