import SignupForm from "../components/signupForm/SignupForm"
import { useState } from "react"


//add props in once auth is working
const Signup = () => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg =>{
    setMessage(msg)
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <SignupForm updateMessage ={updateMessage}/>
    </div>
  )
}

export default Signup