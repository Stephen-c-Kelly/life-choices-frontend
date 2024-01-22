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
        <LoginForm {...props} updateMessage={updateMessage} />
    </div>
  )
}

export default Login