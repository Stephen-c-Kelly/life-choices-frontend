import { Link, useLocation } from 'react-router-dom';
import '../nav/Nav.css'
//import '../../components/nav/nav.css'

const Nav = (props) => {
  const location = useLocation();

  // List of paths where the Nav should be hidden
  const hiddenPaths = ['/', '/signup'];

  // Check if the current path is in the hiddenPaths array
  const isHidden = hiddenPaths.includes(location.pathname)

  // If the Nav should be hidden, return null
  if (isHidden) {
    return null;
  }

  const handleLogout = props.handleLogout

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
          <div className="collapse navbar-collapse justify-content-space-evenly" id="navbarNav">
            <div className="navbar-nav nav">
              <div className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/newpost">New Post</Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/homepage">Home</Link>
              </div>
              <div className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLogout}>Sign Out</Link>
              </div>
            </div>
          </div>
      </div>
    </nav>
  );
}

export default Nav;
