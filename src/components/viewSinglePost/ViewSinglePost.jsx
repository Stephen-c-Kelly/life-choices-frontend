import {getSinglePost} from '../../services/protectedServices.js'
import { useState, useEffect} from 'react'

const ViewSinglePost = (props) => {
  //set to null because it's an empty object 
  const [post, setPost] = useState(null)
  console.log(props.id)

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

  // console.log(post, 'middle');

  useEffect(() => {
    console.log(post, 'updated post state');
  }, [post])

  
  return (
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
  )
}

export default ViewSinglePost

