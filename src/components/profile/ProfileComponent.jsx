
import './ProfileComponent.css';

const ProfileComponent = ( props ) => {
    return (
        <main className='container'>
            <h1>{props.user ? `Hello, ${props.user.username}` : 'Loading...'}</h1>
        </main>
    );
};



export default ProfileComponent;
