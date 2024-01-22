import LoginForm from "../components/LoginForm"

import { useState } from "react"

const Login = () => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <div>
        <h1>Login</h1>
        <LoginForm updateMessage={updateMessage} />
    </div>
  )
}

export default Login