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
const [comment, setComment]=useState({
  content: '',
  username: userInfo.username
})
const [commentSubmitted, setCommentSubmitted] = useState(false)
const [showCommentField, setShowCommentField]=useState(false)

useEffect(()=>{
  const fetchComments = async (postId) =>{
    const postComments= await protectedServices.getCommentsfromPostId(postId)
    setComments(postComments)
    setCommentSubmitted(false)
  }

  fetchComments(id)
}, [id, commentSubmitted])

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
    setCommentSubmitted(true)
    toggleAddComment()
  } catch (error){
    throw error
  }
}

  return (
    <div>
      <ChoiceButtons  />
      <CommentPosts comments={comments} /> 
      
      <button onClick={toggleAddComment}>Add Comment</button>
        {showCommentField && (
            <form onSubmit={handleSubmitNewComment}>
                <textarea
                    name="content"
                    // value={comment.content}
                    
                    onChange={handleAddComment}
                    placeholder="Write your comment here"
                />
                <button type="submit">Submit Comment</button>
                <button type="cancle" onClick={toggleAddComment}>Never mind</button>
            </form>
        )} 
    </div>
  )
}

export default CommentComponent