//i would take the id out of the token and placing it the url 

import './ProfileComponent.css'

const ProfileComponent = ({ user }) => {
  return (
    <main className='container'>
      <h1>hello, {user ? user.name : 'friend'}</h1>
    </main>
  )
}

export default ProfileComponent