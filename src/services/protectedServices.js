import { async } from 'q'
import * as tokenService from './tokenService'

async function getUserProfile(){
    try {
        const res = await axios.get('http://localhost:3000/profiles', {
        headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
        return await res.json()
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error){
            throw Error(error.response.data.error)
            }
    }
}

async function createPost(){
    try {
        const res = await axios.post('http://localHost:300/posts',{title: title, img: img, content: content, choice1: choice1, choice2: choice2},{
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
    } catch (error) {
        throw Error(error)
        
    }
}

export{
    getUserProfile,
    createPost
}