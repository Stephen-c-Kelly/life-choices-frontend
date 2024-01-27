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
const [areButtonsDisabled, setDisableChoiceBtnsForUser] = useState(false);

const [countState1, setCountState1] = useState(0);
const [countState2, setCountState2] = useState(0);
const [updateTrigger, setUpdateTrigger] = useState(0);

useEffect(() => {
  const fetchPost = async () => {
    try {
      const postData = await protectedServices.getSinglePost(id);
      setPost(postData);
      setCountState1(postData.count1.length)
      setCountState2(postData.count2.length)
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  fetchPost();
}, [id, updateTrigger]);

console.lo

const handleChoiceClick = async (id, choiceField, username) => {
  setDisableChoiceBtnsForUser(true)
  try {
    await protectedServices.updatePostChoice(id, choiceField, username)
    setUpdateTrigger(prev => prev + 1)
   // {/* on vote selection the selected choice needs to change color */}
  } catch (error) {
    console.error("Error in updating choice:", error);
  } 
}
return (
  <div>
    {post ? (
      <>
        <h2>Vote Here</h2>
        <button
          className="choice-button choice1"
          disabled={areButtonsDisabled}
          onClick={() => handleChoiceClick(id, 'count1', username)}>
            {post.choice1 || 'Choice 1'}
        </button>
        <p>{countState1 || 'Votes loading'}</p>
        <button
          className="choice-button choice2"
          disabled={areButtonsDisabled}
          onClick={() => handleChoiceClick(id, 'count2', username)}>
            {post.choice2 || 'Choice 2'}
            
        </button>
        <p>{countState2 || 'Votes loading'}</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
)
}

export default ChoiceButtons