import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
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
    console.log(display)
  }, [])
  console.log(display)
  return (
    <div>
   {display.length ? 
  <>
  {display.map(post =>
  <div>
  <Link to={`/viewpost/${post._id}`} key={post._id}>{post.title}</Link>
  </div>
  )}
  </>:
  <p>No Posts</p>
  }
    </div>
  )
}

export default ViewPostComponent



