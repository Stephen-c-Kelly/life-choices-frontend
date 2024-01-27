
import './ProfileComponent.css';
import * as protectedServices from '../../services/protectedServices'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileComponent = ( props ) => {
    const [display, setDisplay] = useState([])
    useEffect(()=>{
        const fetchProfile = async () =>{
            const profileData = await protectedServices.singleProfile()
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
                <div key={`post${index}`} className="post-container">
                <Link to={`/viewpost/${post._id}`} key={post._id}>{post.title}</Link>
                <h4 key={post.content}className="post-content">{post.content}</h4>
                </div>)}
                
           </div>
           {/* this code could use some refactoring, adding choice titles and votes on the page. */}

           
        {/* <div>
            {display.map((post, index) =>
            
            <div key={`post${index}`} className="post-container">
            <Link to={`/viewpost/${post._id}`} key={post._id}>{post.title}</Link>
            <h4 key={post.content}className="post-content">{post.content}</h4>

            <div className="choices-container">
                <div className="choices1-container">
                <div className="image-container">
                <img key={`img$[0]`} src={post.img[0]} className="post-image"/>
                </div>
                
                <div className="choice-box">
                    <button name="count1" className="choices choice1" key="choice1" 
                    post={post} data-postid={post._id} onClick={(e) => onClick(e, post, "count1")}
                    disabled={clickedPosts[post._id]?.count1 || clickedPosts[post._id]?.count2 || post.count1.includes(thisUser.username) || post.count2.includes(thisUser.username) }>
                    {post.choice1}
                    </button>
                    <p  key='choice1-count'className="choice-count1"
                    >{post.count1.length}</p>
                </div>
                </div>

                <div className="choices2-container">
                <div className="image-container">
                    <img key={`img[1]`} src={post.img[1]} className="post-image"/>
                </div>
                
                <div className="choice-box">
                    <button className="choices choice2" key="choice2"
                    post={post} data-postid={post._id}
                    onClick={(e) => onClick(e, post, "count2")}
                    disabled={clickedPosts[post._id]?.count1 || clickedPosts[post._id]?.count2 || post.count1.includes(thisUser.username) || post.count2.includes(thisUser.username) }>
                    {post.choice2}
                    </button>
                    <p key='choice2-count' className="choice-count2">{post.count2.length}</p>
                </div>
                </div>
            </div>

            </div>
            )}
            </div> */}
        </main>
    );
};

export default ProfileComponent;
