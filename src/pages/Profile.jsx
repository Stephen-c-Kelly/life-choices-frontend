import ProfileComponent from "../components/ProfileComponent";

const ProfilePage = (user) => {
  return (
    <div style={{ marginTop: '70px' }}> {/* Adjust the value based on your navbar height */}
      <h1><ProfileComponent user={user.props}/></h1>
      {/* Other profile content */}
    </div>
  );
}

export default ProfilePage;
