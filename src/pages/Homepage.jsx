import ViewAllPostComponent from '../components/viewAllPosts/ViewAllPosts'
import '../components/viewAllPosts/ViewAllPosts.css'

const Homepage = () => {
  return (
    <div style={{ marginTop: '70px' }}> {/* Adjust the value based on your navbar height */}
        <ViewAllPostComponent/>
      {/* Other profile content */}
    </div>
  );
}

export default Homepage;
