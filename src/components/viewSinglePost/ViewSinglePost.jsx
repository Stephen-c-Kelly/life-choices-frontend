import {getSinglePost} from '../../services/protectedServices.js'
import { useState, useEffect} from 'react'

const ViewSinglePost = (props) => {
  const [post, setPost] = useState([])

  useEffect(()=>{
    const fetchSingle = async () => {
      try {
        const singlePost = await getSinglePost(props.id)
        setPost(singlePost);
      } catch (error) {
        console.error("Error fetching post:", error)
      }
    }
    fetchSingle()
    // console.log(post, 'inside use effect')
  },[props.id])

  // console.log(post, 'after use effect')
  return (
    <div>Single</div>
  )
}

export default ViewSinglePost

