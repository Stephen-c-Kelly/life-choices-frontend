
import * as tokenService from './tokenService'
import axios from 'axios'

// const baseUrl = `http://localhost:3000`
const baseUrl = `https://lifechoices-a9061aaee4a7.herokuapp.com`

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

async function singleProfile(){
    try{
        const user = tokenService.getProfileFromToken()
        const res = await axios.get(`${baseUrl}/profiles/${user}`,{headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
        //console.log(res.json(), 'res')
        return res.data
    }catch{
        throw Error
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

async function getSinglePost(id) {
    console.log("ID being passed to getSinglePost:", id) // Log the ID to check its value

    try {
        const res = await axios.get(`${baseUrl}/posts/${id}`, {
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }
        })
        console.log(res, 'this is your res')
        return res.data.post
    } catch (error) {
        console.error("Error in getSinglePost:", error)
        throw error
    }
}

async function getMultiplePosts(arr){
    console.log(`arr being passed:`, arr)
    try {
        const requests = arr.map(id=>{
            return axios.get(`${baseUrl}/posts/${id}`, {
                headers: { Authorization: `Bearer ${tokenService.getToken()}` }
            }
        )})

        const responses = await Promise.all(requests);
        console.log(`posts`, responses);

        return responses.map(res => res.data.post)
    } catch (error) {
        console.error("Error in getMultiplePosts:", error);
        throw error;}
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
    getSinglePost,
    getMultiplePosts,
    singleProfile
}