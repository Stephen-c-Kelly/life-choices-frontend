
import './ProfileComponent.css';
import * as protectedServices from '../../services/protectedServices'
import { useEffect, useState } from 'react';

const ProfileComponent = ( props ) => {
    const [display, setDisplay] = useState([])
    useEffect(()=>{
        const fetchProfile = async () =>{
            const profileData = await protectedServices.singleProfile()
            console.log(profileData)
            setDisplay(profileData.profile[0].postId)
        }
        fetchProfile()
    },[])
    console.log(display, 'display')
    return (
        <main className='container'>
            <h1>{props.user ? `Hello, ${props.user.username}` : 'Loading...'}</h1>
        </main>
    );
};

export default ProfileComponent;
