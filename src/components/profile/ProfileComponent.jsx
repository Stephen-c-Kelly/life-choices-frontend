import { useEffect, useState } from 'react';
//import { getUserProfile } from '../../src/services/protectedServices';
import { getUserFromToken } from '../../services/tokenService'; // Import getUserFromToken

import './ProfileComponent.css';

const ProfileComponent = ( user ) => {
    const [username, setUsername] = useState({});

    
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Get user from token
                const loggedInUser = getUserFromToken();
                
                setUsername(loggedInUser.username);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
        // if (user) {
        // }
    }, [user]);

    const users = getUserFromToken()
    console.log(users)
    return (
        <main className='container'>
            <h1>{username ? `Hello, ${username}` : 'Loading...'}</h1>
        </main>
    );
};

export default ProfileComponent;
