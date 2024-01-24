import { Link, useLocation } from 'react-router-dom';

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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/homepage">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>Sign Out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
