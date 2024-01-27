//
import { useState, useEffect } from "react";
import { useParams } from 'react-router'
//
import * as protectedServices from '../../services/protectedServices'
import { getUserFromToken } from "../../services/tokenService";
//
import ChoiceButtons from "../choiceButtons/choiceButtons";
import CommentPosts from "../commentPosts/commentPosts"

const CommentComponent = (props) => {
  const userInfo = getUserFromToken()
  const {id} = useParams() 
const [comments, setComments]=useState([])
const [comment, setComment]=useState(false)

const fetchComments = async (postId) =>{
  const postComments= await protectedServices.getCommentsfromPostId(postId)
  setComments(postComments)
}

// handling comments 
const [showCommentField, setShowCommentField]=useState(false)

const toggleAddComment = () => {
  setShowCommentField(!showCommentField)
}

const handleAddComment = e => {
  setComment({...comment, [e.target.name]: e.target.value})
}

const handleSubmitNewComment = async e => {
  e.preventDefault()
  try{
    protectedServices.addCommentToId(comment.content, comment.username, id)
    console.log(`comment added:`, comment)
    
  } catch (error){
    throw error
  }
}

useEffect(()=>{
  fetchComments(id)
}, [id, comments])


  return(
    <div>
      <ChoiceButtons  />
      comments.length ? <CommentPosts comments={comments}/> :
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