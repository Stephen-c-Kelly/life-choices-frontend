import * as protectedServices from '../services/protectedServices'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";

const UserProfile = () => {
  const username = useParams()  
  const user = username.id

    const [display, setDisplay] = useState([])

    useEffect(()=>{
        const fetchProfile = async () =>{
            const profileData = await protectedServices.userProfile(user)
            setDisplay(profileData.profile[0].postId)
        }
        fetchProfile()
    },[])

    const [posts, setPosts] = useState([])


    useEffect(()=>{
        const fetchPosts = async (display) =>{
            const userPosts= await protectedServices.getMultiplePosts(display)
            userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setPosts(userPosts)
        }
        fetchPosts(display)

    }, [display])

    return (
        <main className='container'>
            <h1>
                {user ? `Welcome to, ${user}'s page` : 'Loading...'}
            </h1>
            <div>
            {posts.map((post, index) =>
                <div key={`post${index}`} className='post-container'>
                <Link to={`/viewpost/${post._id}`} key={post._id}>{post.title}</Link>
                <h4 key={post.content}className="post-content">{post.content}</h4>
                </div>)}
            </div>
        </main>
    )
}

export default UserProfile;
