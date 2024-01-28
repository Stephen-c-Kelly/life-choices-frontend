import LoginForm from "../components/loginForm/LoginForm"

import { useState } from "react"

import videoBg from '../media/videoBg.mp4';

import logo from '../media/logo.png'

const Login = (props) => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <div>
        {/* <h1>Login</h1> */}
        <video src={videoBg} autoPlay loop muted />
        <img src={logo} className="logo"/>
        <LoginForm {...props} updateMessage={updateMessage} errorMessage={message}/>
    </div>
  )
}

export default Login