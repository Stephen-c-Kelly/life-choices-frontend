
import './ProfileComponent.css';
import * as protectedServices from '../../services/protectedServices'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    const [posts, setPosts] = useState([])


    useEffect(()=>{
        const fetchPosts = async (display) =>{
            const userPosts= await protectedServices.getMultiplePosts(display)
            console.log(`user posts are:`, userPosts)
            setPosts(userPosts)
        }
        fetchPosts(display)

    }, [display])

    // use axios to grab the posts from each ID

    console.log(display, 'display')
    // ['65b3f21b1cc3d7e50837925d', '65b3f2401cc3d7e508379266']
    return (
        <main className='container'>
            <h1>
                {props.user ? `Hello, ${props.user.username}` : 'Loading...'}
            </h1>
            <div>
            {posts.map((post, index) =>
                <div key={`post${index}`} className='post-container'>
                <Link to={`/viewpost/${post._id}`} key={post._id}>{post.title}</Link>
                <h4 key={post.content}className="post-content">{post.content}</h4>
                </div>)}
                
           </div>
        </main>
    );
};

export default ProfileComponent;
