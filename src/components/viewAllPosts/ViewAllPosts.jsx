import { useEffect, useState } from "react"
import * as protectedServices from '../../services/protectedServices'


const ViewPostComponent = () => {
  const [display, setDisplay] = useState([])

  useEffect(()=>{
    const fetchPosts = async () =>{
      const postsData = await protectedServices.getPosts()
      const singlepost = postsData.allPosts
      setDisplay(singlepost)
    }
    fetchPosts()
  }, [])
  
  return (
    <div>
   {display.length ? 
  <>
  {display.map(post =>
  <p key={post._id}>{post.title}</p>
  )}
  </>:
  <p>No Posts</p>
  }
    </div>
  )
}

export default ViewPostComponent



