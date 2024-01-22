import { useState } from "react";

import {Link, useNavigate} from 'react-router-dom'

import * as authService from '../services/authService.js'

//import auth here 

const LoginForm = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = e =>{
    props.updateMessage('')
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      navigate('/profile')
    } catch (error) {
      props.updateMessage(error.message)
    }
  }

  return (
    <form autoComplete="off"
    onSubmit={handleSubmit}>
      <div>
        <input
            type="text"
            autoComplete="off"
            id="email"
            value={formData.email}
            name="email"
            placeholder="email"
            //handleChange looks for a change to the form
            onChange={handleChange}
          />
      </div>
      <div>
        <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            placeholder="password"
            //handleChange looks for a change to the form
            onChange={handleChange}
          />
      </div>
      <div>
        <button>Log In</button>
      </div>
    </form>
  )
}

export default LoginForm