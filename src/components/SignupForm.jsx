import * as authService from '../services/authService.js'

import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

//add props in once auth is working 
const SignupForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        // passwordConf: '' will add this back in with auth
    })

    
  return (
    <div>
        test
    </div>
  )
}

export default SignupForm