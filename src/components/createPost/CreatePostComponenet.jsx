import * as protectedServices from '../../services/protectedServices.js'

import {Link, useNavigate} from 'react-router-dom'
import { useState } from "react"

const CreatePost = () => {
    const navigate = useNavigate()
    //took image out for now
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        choice1: '',
        choice2: '',
    })

    const handleChange = e =>{
      setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            protectedServices.createPost(formData)
            console.log(formData)
            navigate('/')
        } catch (error) {
            throw error
        }
    }

    const isFormInvalid=()=>{
      return !(title && choice1 && choice2)
    }

    const {title,content,choice1,choice2} = formData
  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <div>
        <input type="text"
        autoComplete='off'
        id='title'
        value={title}
        name='title'
        onChange={handleChange}
        placeholder='title'/>
      </div>
      <div>
        <input type="text" autoComplete='off'
        id='content'
        value={content}
        name='content'
        onChange={handleChange}
        placeholder='content'/>
      </div>
      <div>
        <input type="text" autoComplete='off'
        id='choice1'
        value={choice1}
        name='choice1'
        onChange={handleChange}
        placeholder='choice1'/>
      </div>
      <div>
        <input type="text" autoComplete='off'
        id='choice2'
        value={choice2}
        name='choice2'
        onChange={handleChange}
        placeholder='choice2'/>
      </div>
      <button disabled={isFormInvalid()}>Share</button>
      <Link to='/'>Nevermind</Link>
    </form>
  )
}

export default CreatePost