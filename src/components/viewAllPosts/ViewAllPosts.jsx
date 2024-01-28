import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import * as protectedServices from '../../services/protectedServices'
import * as tokenServices from '../../services/tokenService.js'

// import './viewAllPosts.css' // Murad please change the css files.

const baseUrl = `http://localhost:3000`
//const baseUrl = `https://lifechoices-a9061aaee4a7.herokuapp.com`


const ViewPostComponent = () => {
  const [display, setDisplay] = useState([])
  const [clickedPosts, setClickedPosts] = useState({})
  const [thisUser, setThisUser] =useState(null)


  useEffect(() => {
    const fetchUserAndPost = async () => {
      const loggedInUser = await tokenServices.getUserFromToken()
      setThisUser(loggedInUser)

      if (loggedInUser){
        
        const postsData = await protectedServices.getPosts()
        const singlePost = postsData.allPosts.map(post => ({
          ...post,
          isLiked: post.likes.includes(loggedInUser.username),// Add isLiked property
          isSelectedCount1: post.count1.includes(loggedInUser.username), // New property
          isSelectedCount2: post.count2.includes(loggedInUser.username)  
        }));
        singlePost.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));// Sort function


        setDisplay(singlePost)
        }
    }
    fetchUserAndPost()

  }, [])
// console.log(thisUser)




  //check if user has liked a post
// console.log(display.likes.includes(thisUser))

  // add like handler
  const likeHandler = async (e, post)=>{
    const id = post._id
    const isLiked = post.isLiked
    let updateInfo
    if (!isLiked){
      e.target.className = "fas fa-heart"
      updateInfo = { $push:{likes:thisUser.username} }

    }else{
      e.target.className = "far fa-heart"
      updateInfo = { $pull: {likes:thisUser.username} }

    }
    try {
      const updateLikes = await protectedServices.updatePost(id, updateInfo)
      const likesPElement = e.target.nextElementSibling;
      likesPElement.innerText = updateLikes.data.updatedPost.likes.length
      console.log(updateLikes.data.updatedPost.likes)
      setDisplay(currentDisplay =>

        currentDisplay.map(p => 
          p._id === id ? { ...p, 
            likes: updateLikes.data.updatedPost.likes, 
            isLiked: !isLiked }
            : p,
        )
      );

      if (post.isSelectedCount1 === true){
          
      }
      

    }catch (error) {
      console.error('Error updating likes:', error);
    }
  }

  const onClick = async (e, post, countType)=> {
    const currentClickedStatus = clickedPosts[post._id] || {}


    if ( currentClickedStatus[countType === "count1" ? "count2" : "count1"]) {
      return 
    }
    
    if (post.count1.includes(thisUser.username) || post.count2.includes(thisUser.username)){
      return
    }

    // if (countN.replace('count','') == 1 && !post.count1.includes(thisUser.username) )
    if (!post[countType].includes(thisUser.username))
    {
      const updateVoteInfo = { $push:
        {[countType]:thisUser.username},
      }
      console.log(updateVoteInfo)
      const id = e.target.dataset.postid
      // console.log(post.count1.includes(thisUser), 'includes the thisUser?')
      const addVoteUser = await axios.put(`${baseUrl}/posts/${id}`, updateVoteInfo,{
        headers: { Authorization: `Bearer ${tokenServices.getToken()}` }})
        
      console.log(addVoteUser.data) 
      const pElement = e.target.nextElementSibling;
      pElement.innerText = addVoteUser.data.updatedPost[countType].length
    

      console.log("updated count:", addVoteUser.data.updatedPost[countType])

      setClickedPosts(prev => ({
        ...prev,
        [post._id]: { ...prev[post._id], [countType]: true }
      }));

      if (countType === 'count1' || countType === 'count2') {
        const button = e.target; // Assuming e.target is the button itself
        button.style.color = 'red'; // Change color as needed
        button.style.backgroundColor = 'grey'


      }
    
      setDisplay(currentDisplay =>
        currentDisplay.map(p =>
          p._id === post._id
            ? { ...p,             
              isSelectedCount1: countType === 'count1' ? true : p.isSelectedCount1,
              isSelectedCount2: countType === 'count2' ? true : p.isSelectedCount2,  }
            : p
        )
      );
    }
    
  }
console.log(display)


  return (
    <div className="container">
   {display.length ? 
  <>

  {display.map((post, index) =>
  <div key={`post${index}`} className="post-container">
    <div className="post-header">
      <Link to={`/profile/${post.username}`} key={post._id}>
        <small className="username">{`@${post.username}`}</small>
      </Link>
    </div>
      
      <Link to={`/viewpost/${post._id}`} key={post._id}><h1>{post.title}</h1></Link>
      <h4  key={post.content}className="post-content">{post.content}</h4>

      <div className="choices-container">
        <div className="choices1-container">
        <div className="image-container">
          <img key={`img$[0]`} src={post.img[0]} className="post-image"/>
        </div>
          
          <div className="choice-box">
            <button name="count1" className={`choices choice1 ${post.isSelectedCount1 ? 'selected' : ''}`} 
              style={{ 
                color: post.isSelectedCount1 ? 'red' : 'black',
                backgroundColor: post.count1.includes(thisUser.username) || post.count2.includes(thisUser.username) ? 'grey' : null,
                backgroundColor: post.isSelectedCount1 || post.isSelectedCount2 ? 'grey' : null // Change colors as needed
              }}
              key="choice1" 
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
            <button className={`choices choice2 ${post.isSelectedCount2 ? 'selected' : ''}`} 
              style={{ 
                color: post.isSelectedCount2 ? 'red' : 'black',
                backgroundColor: post.count1.includes(thisUser.username) || post.count2.includes(thisUser.username) ? 'grey' : null,
                backgroundColor: post.isSelectedCount1 || post.isSelectedCount2 ? 'grey' : null // Change colors as needed
              }}
              key="choice2"
              post={post} data-postid={post._id}
              onClick={(e) => onClick(e, post, "count2")}
              disabled={clickedPosts[post._id]?.count1 || clickedPosts[post._id]?.count2 || post.count1.includes(thisUser.username) || post.count2.includes(thisUser.username) }>
              {post.choice2}
            </button>
            <p key='choice2-count' className="choice-count2">{post.count2.length}</p>
          </div>
        </div>
      </div>

      <div className="icon-container">
        <div className="likes-container">
          <i className={`${post.isLiked?'fas':'far'} fa-heart`} onClick={(e) => likeHandler(e, post)}></i>
          <p className="likes-count">{post.likes.length}</p>
        </div>
        <div className="comments-container">
        <Link to={`/viewpost/${post._id}`} key={post._id}>
          <i className="far fa-comment"></i>
        </Link>
        
        <p className="comments-count">{post.commentId.length}</p>
        </div>
      </div>

  </div>
  )}
  </>:
  <p>No Posts</p>
  }
    </div>
  )
}

export default ViewPostComponent



