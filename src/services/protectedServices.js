
import * as tokenService from './tokenService'
import axios from 'axios'

const baseUrl = `http://localhost:3000`
// const baseUrl = `https://lifechoices-a9061aaee4a7.herokuapp.com`

async function getUserProfile(){
    try {
        const res = await axios.get(`${baseUrl}/profiles`, {
        headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
        return await res.json()
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error){
            throw Error(error.response.data.error)
            }
    }
}

async function getPosts(){
    try {
        const res = await axios.get(`${baseUrl}/posts`,{
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
            return res.data
    } catch (error) {
     throw Error   
    }
}

async function getSinglePost(id){
    try {
        const res = await axios.get(`${baseUrl}/posts/${id}`, updateInfo,{
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
            return await res.data
    } catch (error) {
        console.error("Error in getSinglePost:", error);
        throw error
    }
}

async function createPost(updateInfo){
    try {
        const res = await axios.post(`${baseUrl}/posts`,updateInfo,{
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
            return res
    } catch (error) {
        throw Error(error)
    }
}

export{
    getUserProfile,
    createPost,
    getPosts,
    getSinglePost
}