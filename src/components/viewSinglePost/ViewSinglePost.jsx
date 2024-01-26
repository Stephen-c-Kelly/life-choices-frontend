import {getSinglePost} from '../../services/protectedServices.js'
import { useState, useEffect} from 'react'
import { getUserFromToken } from '../../services/tokenService.js'

const ViewSinglePost = (props) => {
  const [post, setPost] = useState(null)
  
  const user = getUserFromToken()
  console.log(user.profileId, 'first')


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

// console.log(post, 'post info')
  // useEffect(() => {
  //   console.log(post, 'updated post state');
  // }, [post])

  
  return (
    <div>
      {post && user.profileId === post.profileId? 
      <>
      'yes' 
      </>
      :
      <div>
      <div>
        <h1>{post ? post.title : 'Loading'}</h1>
      </div>
      <div>
        <p>{post? post.content : 'Loading'}</p>
      </div>
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
      </div>
}
    </div>
  )
}

export default ViewSinglePost

