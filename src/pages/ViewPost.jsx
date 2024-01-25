import { useParams } from 'react-router'
import ViewSinglePost from '../components/viewSinglePost/ViewSinglePost'

const ViewPost = () => {
  const {id} = useParams()
  return (
    <div>
      <ViewSinglePost id={id}/>
    </div>
  )
}

export default ViewPost