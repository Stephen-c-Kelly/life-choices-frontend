import { useParams } from 'react-router'
import ViewSinglePost from '../components/viewSinglePost/ViewSinglePost'

const ViewPost = (user) => {
  const {id} = useParams()
  return (
    <div className='container1'>
      <ViewSinglePost user={user} id={id}/>
    </div>
  )
}

export default ViewPost