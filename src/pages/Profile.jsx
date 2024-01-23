import ProfileComponent from '../components/ProfileComponent'

const ProfilePage = () => {
  return (
    <div style={{ marginTop: '70px' }}> {/* Adjust the value based on your navbar height */}
      <h1><ProfileComponent/></h1>
      {/* Other profile content */}
    </div>
  );
}

export default ProfilePage;
