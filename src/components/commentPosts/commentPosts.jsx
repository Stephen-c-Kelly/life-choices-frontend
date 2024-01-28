import './commentPosts.css'

const CommentPosts = ({comments}) => {
  // console.log(comments, `comment posts comments`)
  return (
    <div>
    {comments.length > 0 ? (
      <div className='comments-list'>
        {comments.map((comment, index) => (
          <div key={`comment${index}`} className='comment'>
            <h5 className='username'>{comment.username}</h5>
            <h4 className='comment-text'>{comment.content}</h4>
          </div>
        ))}
      </div>
    ) : (
      <p>No comments</p>
    )}
  </div>
  )
}

export default CommentPosts