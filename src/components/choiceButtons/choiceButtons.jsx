import { useState, useEffect } from "react";
import { getUserFromToken } from "../../services/tokenService";
import { useParams } from "react-router";
import * as protectedServices from '../../services/protectedServices' 


//handling choice buttons
const ChoiceButtons = (props) => {
const userInfo = getUserFromToken()
const username=userInfo.username
const {id} = useParams()  
const [post, setPost] = useState(null);
const [clicked, setClicked] = useState({ count1: false, count2: false });
const [areButtonsDisabled, setDisableChoiceBtnsForUser] = useState(false);

const [countState1, setCountState1] = useState(0);
const [countState2, setCountState2] = useState(0);

useEffect(() => {
  const fetchPost = async () => {
    try {
      const postData = await protectedServices.getSinglePost(id);
      setPost(postData);
      setCountState1(post.count1.length)
      setCountState2(post.count2.length)
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  fetchPost();
}, [id]);



const handleChoiceClick = async (id, choiceField, username) => {
  setDisableChoiceBtnsForUser(true)
  try {
    await protectedServices.updatePostChoice(id, choiceField, username)
  } catch (error) {
    console.error("Error in updating choice:", error);
  } 
}

  return (
    
    <div>
      {post ? (
        <>
      <h2>choice buttons go here</h2>
      <button
        className="choice-button choice1"
        disabled={areButtonsDisabled}
        onClick={()=> handleChoiceClick(id, username, 'count1')}>
          <p>{post.choice1}</p>
        </button>
        <button
        className="choice-button choice2"
        disabled={areButtonsDisabled}
        onClick={()=> handleChoiceClick(id, username, 'count2')}>
          <p>{post.choice2}</p>
        </button>

        </>
      ) : (
        <p>Loading...</p>
      
      )}

    </div>
  )
}

export default ChoiceButtons