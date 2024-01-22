import {Link} from 'react-router-dom'

const Nav = () => {
  return (
    <div>
        <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/signup'>Signup</Link> </li>
            <li><Link to='/newpost'>New Post</Link></li>
        </ul>
    </div>
  )
}

export default Nav