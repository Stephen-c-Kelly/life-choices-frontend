import {getSinglePost} from '../../services/protectedServices.js'
import { useState, useEffect} from 'react'

const ViewSinglePost = ({id, user}) => {
  //set to null because it's an empty object 
  const [post, setPost] = useState(null)

console.log(user, 'user ')
  // console.log(props, "props")


  useEffect(()=>{
    const fetchSingle = async () => {
      try {
        const singlePost = await getSinglePost(id)
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
      {id === post? 'yes': 'no'}
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
  )
}

export default ViewSinglePost

