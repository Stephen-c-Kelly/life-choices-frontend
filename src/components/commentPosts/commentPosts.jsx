import './commentPosts.css'

const CommentPosts = ({comments}) => {
  
  return (
    <div className='comments-list'>
      {comments.map((comment, index) =>
      <div key={`comment${index}`}
      className='comment'>
        <h5>{comment.username}</h5>
        <h4>{comment.content}</h4>
      </div>
      )}
    </div>
  )
}

export default CommentPosts