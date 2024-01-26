import {getSinglePost} from '../../services/protectedServices.js'
import { useState, useEffect} from 'react'
import { getUserFromToken } from '../../services/tokenService.js'
import { updatePost } from '../../services/protectedServices.js'

const ViewSinglePost = (props) => {
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
        console.log(props.id, 'id')
        console.log(formData, 'form data')
         const update = await updatePost(props.id,formData)
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
  


  return (
    <div>
      {post ? (
        <>
          {isEditMode ? (
            // Edit mode: show form for title and content
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
            // View mode: display title and content as text
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
          
          {/* Edit button */}
          {user.profileId === post.profileId && (
            <button onClick={toggleEdit}>{isEditMode ? 'Cancel' : 'Edit'}</button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>

    // <div>
    //   <div>
    //     <h1>{post ? post.title : 'Loading'}</h1>
    //   </div>
    //   <div>
    //     <p>{post? post.content : 'Loading'}</p>
    //   </div>
      // <div>
      //   <p>{post? post.choice1 : 'Loading'}</p>
      // </div>
      // <div>
      //   <p>{post? post.count1 : 'Loading'}</p>
      // </div>
      // <div>
      //   <p>{post? post.choice2 : 'Loading'}</p>
      // </div>
      // <div>
      //   <p>{post? post.count2 : 'Loading'}</p>
      // </div>
      // <div>
      //   <p>{post? post.img : 'Loading'}</p>
      // </div>
      // <div>
      //   <p>{post? post.updatedAt : 'Loading'}</p>
      // </div>
      // <div>
      //   <p>{post? post.profileId  : 'Loading'}</p>
      // </div>
      // <div>
      //   <p>{post? post.username  : 'Loading'}</p>
      // </div>
    //   {post && user.profileId === post.profileId? 
    //   <>
    //   <button onClick={toggleEdit}>Edit</button> <button>Delete</button>
    //   </>
    //   : null }
    //   {post && user.profileId && !isEditMode === post.profileId? 
    //   <>
    //     <form>
    //     <div>
    //       <input type="text"
    //         autoComplete='off'
    //         id='title'
    //         onChange={handleChange}
    //         name='title'
    //         placeholder={post? post.content: 'loading'}/>
    //     </div>
    //     <div>
    //       <input type="text" autoComplete='off'
    //       id='content'
    //       onChange={handleChange}
    //       name='content'
    //       placeholder={post? post.content: 'loading'}/>
    //     </div>
    //     <button onClick={handleSubmit}>Update</button>
    //     <button onClick={toggleEdit}>Cancel</button>
    //   </form>
    //   </>
    //   : null }
    //    <form>
    //     <div>
    //       <input type="text"
    //         autoComplete='off'
    //         id='title'
    //         onChange={handleChange}
    //         name='title'
    //         placeholder={post? post.content: 'loading'}/>
    //     </div>
    //     <div>
    //       <input type="text" autoComplete='off'
    //       id='content'
    //       onChange={handleChange}
    //       name='content'
    //       placeholder={post? post.content: 'loading'}/>
    //     </div>
    //     <button onClick={handleSubmit}>Update</button>
    //     <button onClick={toggleEdit}>Cancel</button>
    //   </form>
    // </div>
  )
}

export default ViewSinglePost

