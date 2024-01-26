import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import * as protectedServices from '../../services/protectedServices'
import * as tokenServices from '../../services/tokenService.js'

// import './viewAllPosts.css' // Murad please change the css files.

const baseUrl = `http://localhost:3000`
// const baseUrl = `https://lifechoices-a9061aaee4a7.herokuapp.com`

const ViewPostComponent = () => {
  const [display, setDisplay] = useState([])
  const [clickedPosts, setClickedPosts] = useState({})
  const [thisUser, setThisUser] =useState(null)


  useEffect(()=>{
    const fetchPosts = async () =>{
      const postsData = await protectedServices.getPosts()
      const singlepost = postsData.allPosts
      singlepost.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));// Sort function
      setDisplay(singlepost)
    }
    fetchPosts()
    console.log(display)
  }, [])

// console.log(display)

useEffect(() => {
  const fetchUser = async () => {
    const loggedInUser = await tokenServices.getUserFromToken()
    setThisUser(loggedInUser)
  }
  fetchUser()

}, [])

  const onClick = async (e, post, countType)=> {
    const currentClickedStatus = clickedPosts[post._id] || {}
    console.log('clickstatus', currentClickedStatus)

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


    }
    
  }

  return (
    <div>
   {display.length ? 
  <>

  {display.map((post, index) =>
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

  )}
  </>:
  <p>No Posts</p>
  }
    </div>
  )
}

export default ViewPostComponent



