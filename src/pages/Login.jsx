import LoginForm from "../components/LoginForm"

import { useState } from "react"

const Login = (props) => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <div>
        <h1>Login</h1>
        {/* add the error message as a prop so the login form can use it */}
        <LoginForm {...props} updateMessage={updateMessage} errorMessage={message}/>
    </div>
  )
}

export default Login