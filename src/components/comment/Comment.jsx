import { useState, useEffect } from "react";
import ProfileComponent from "../profile/ProfileComponent";

import { useParams } from 'react-router'
import { getUserFromToken } from "../../services/tokenService";

const CommentComponent = (props) => {
  const userInfo = getUserFromToken()
  // props.user.id also works
  const {id} = useParams()
  console.log(id, `- id`)
  // const postId = [props.id]
  // console.log(postId)

const [comments, setComments]=useState([])

const [comment, setComment]=useState({
  content: '',
  username: userInfo.username
  
})

const handleAddComment = e => {
  setFormData({...comment, [e.target.name]: e.target.value})
}

const handleSubmitNewComment = async e => {
  e.preventDefault()
  try{
    protectedServices.createComment(comment, postId)
    console.log(`comment added:`, comment)
    navigate(`*/viewpost/{id}`)
  } catch (error){
    throw error
  }
}

// console.log(`post id is`, postId)

useEffect((id)=>{
  const fetchComments = async () =>{
    const commentData = await protectedServices. getCommentsfromPostId(id) 
  }
},[])

const addComment = async () => {

}



  return(
    <div>
      no comments yet
      <button>add comment</button>
    </div>
  )
}

export default CommentComponent