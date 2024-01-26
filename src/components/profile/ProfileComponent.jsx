
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

            {display.map((post, index) =>
            // mapping out the display state variable 
        <div key={`post${index}`} className="post-container">
            <Link to={`/viewpost/${post._id}`} key={post._id}>{post.title}</Link>
            <h4  key={post.content}className="post-content">{post.content}</h4>

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
                    <p  key='choice1-count'className="choice-count1">{post.count1.length}</p>
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
    </main>
    );
};

export default ProfileComponent;
