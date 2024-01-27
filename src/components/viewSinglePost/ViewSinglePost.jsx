import {getSinglePost, updatePost, deletePost} from '../../services/protectedServices.js'
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
    const remove = await deletePost(props.id)
    navigate('/profile')
  } catch (error) {
    throw error
  }
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
              <button type="button" onClick={toggleEdit}>Cancel</button>
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
        <p>{post? post.choice1 : 'Loading'}</p>
      </div>
      <div>
        <p>{post? post.count1 : 'Loading'}</p>
      </div>
      <div>
        <p>{post? post.choice2 : 'Loading'}</p>
      </div>
      <div>
        <p>{post? post.count2 : 'Loading'}</p>
      </div>
      <div>
        <p>{post? post.img : 'Loading'}</p>
      </div>
      <div>
        <p>{post? post.updatedAt : 'Loading'}</p>
      </div>
      <div>
        <p>{post? post.profileId  : 'Loading'}</p>
      </div>
      <div>
        <p>{post? post.username  : 'Loading'}</p>
      </div>
          {!isEditMode && (
            <button onClick={toggleEdit}>Edit</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ViewSinglePost

