import { useEffect, useState } from "react"
import * as protectedServices from '../services/protectedServices'


const ViewPostComponent = () => {
  const [display, setDisplay] = useState([])

  useEffect(()=>{
    const fetchPosts = async () =>{
      const postsData = await protectedServices.getPosts()
      console.log(postsData)
      setDisplay(postsData)
    }
    fetchPosts
  }, [])

  return (
    <div>
      {display.length ? 
      <>
      {display.map(posts =>{
        <p key={posts.id}>{posts.title}</p>
      }
      )}
      </>:
      <p>No Posts</p>
      }
    </div>
  )
}

export default ViewPostComponent