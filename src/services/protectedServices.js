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

async function createPost(updateInfo){
    try {
        const res = await axios.post('http://localHost:3000/posts',updateInfo,{
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
            console.log('create post')
    } catch (error) {
        throw Error(error)
        
    }
}

export{
    getUserProfile,
    createPost
}