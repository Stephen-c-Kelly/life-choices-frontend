import { useState, useEffect } from "react";
import ProfileComponent from "../profile/ProfileComponent";
import * as protectedServices from '../../services/protectedServices'

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

const [showCommentField, setShowCommentField]=useState(false)

const toggleAddComment = () => {
  setShowCommentField(!showCommentField)
}

const handleAddComment = e => {
  setComment({...comment, [e.target.name]: e.target.value})
}
console.log(`comment is now`, comment.content, comment.username)

const handleSubmitNewComment = async e => {
  e.preventDefault()
  try{
    protectedServices.addCommentToId(comment.content, comment.username, id)
    console.log(`comment added:`, comment)
    // navigate(`*/viewpost/{id}`)
  } catch (error){
    throw error
  }
}

useEffect((id)=>{
  const fetchComments = async () =>{
    const commentData = await protectedServices. getCommentsfromPostId(id) 
  }
},[])

const addComment = async () => {
}

  return(
    <div>
      <div>no comments yet</div>
      <button onClick={toggleAddComment}>Add Comment</button>
        {showCommentField && (
            <form onSubmit={handleSubmitNewComment}>
                <textarea
                    name="content"
                    value={comment.content}
                    onChange={handleAddComment}
                    placeholder="Write your comment here"
                />
                <button type="submit">Submit Comment</button>
            </form>
        )}
    </div>
  )
}

export default CommentComponent