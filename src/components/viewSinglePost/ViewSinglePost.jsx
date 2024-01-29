import {getSinglePost, updatePost, deletePost} from '../../services/protectedServices.js'
import CommentComponent from '../comment/Comment.jsx'
import { useState, useEffect} from 'react'
import { getUserFromToken } from '../../services/tokenService.js'
import { useNavigate } from 'react-router'


const ViewSinglePost = (props) => {
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState(
    {
      title: '',
      content: ''
  }
  )
  const user = getUserFromToken()
  console.log(user,'user')


  useEffect(()=>{
    const fetchSingle = async () => {
      try {
        const singlePost = await getSinglePost(props.id)
        setPost(singlePost)
      } catch (error) {
        console.error("Error fetching post:", error)
      }
    }
    fetchSingle()
  },[])

  const handleChange = e =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  const handleSubmit = async e =>{
      e.preventDefault()
      try {
         const update = await updatePost(props.id,formData)
         setIsEditMode(!isEditMode)
          post.title = formData.title
          post.content = formData.content
      } catch (error) {
          throw error
      }
  }


  const toggleEdit = ()=>{
    setIsEditMode(!isEditMode)
    if(!isEditMode && post){
      setFormData({
        title: post.title,
        content: post.content
      })
    }
  }
  
const handleDelete = async (e) =>{
  e.preventDefault()
  try {
    const remove = await deletePost(user.profileId,props.id)
    navigate('/profile')
  } catch (error) {
    throw error
  }
}

const formatDate = (created)=>{
  const date = new Date(created)
  const day = date.getDate().toString().padStart(2, 0)
  const month = (date.getMonth()+ 1).toString().padStart(2,0)
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}
  return (
    <div>
      {post ? (
        <>
          {isEditMode ? (
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  autoComplete='off'
                  id='title'
                  onChange={handleChange}
                  name='title'
                  value={formData.title}
                />
              </div>
              <div>
                <textarea
                  autoComplete='off'
                  id='content'
                  onChange={handleChange}
                  name='content'
                  value={formData.content}
                />
              </div>
              <button type="submit">Update</button>
              <button type="button" onClick={toggleEdit}>Nevermind</button>
            </form>
          ) : (
            <>
              <div>
                <h1>{post.title}</h1>
              </div>
              <div>
                <p>{post.content}</p>
              </div>
            </>
          )}
      <div>
        <p>{post? post.username  : 'Loading'}</p>
      </div>
      <div>
        <p>{post? formatDate(post.updatedAt) : 'Loading'}</p>
      </div>
      <div>
        <p>{post? post.img : 'Loading'}</p>
      </div>
      {post && post.profileId === user.profileId && (
      <>
      {!isEditMode && <button onClick={toggleEdit}>Edit</button>}
      <button onClick={handleDelete}>Delete</button>
      </>
      )}
         
        </>
      ) : (
        <p>Loading...</p>
      )}
      <CommentComponent props={props} />
    </div>
  )
}

export default ViewSinglePost

