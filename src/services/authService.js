import * as tokenService from './tokenService.js'

// const baseUrl = `http://localhost:3000`
const baseUrl = `https://lifechoices-a9061aaee4a7.herokuapp.com`

function getUser(){
    return tokenService.getUserFromToken()
}

async function singup(user){
    try {
        const res = await axios.post(`${baseUrl}/signup`, user)
        const json = res.data
        if(json.token){
            return json.token
        }
        if (json.error) {
            throw new Error(json.error)
        }
    } catch (error) {
        throw error
    }
}


async function login(credentials){
    try {
        const res = await axios.post(`${baseUrl}/signin`, credentials)
        const json = await res.data
        if (json.token){
            tokenService.setToken(json.token)
        }
        if(json.error){
            throw new Error(json.error)
        }
    } catch (error) {
        //add this if section so i can grab the error from the back end
        if (error.response && error.response.data && error.response.data.error){
        throw Error(error.response.data.error)
        } else {
            throw new Error('An error occurred')
        }
    }
}

function logout(){
    tokenService.removeToken()
    
}
export { singup, login, getUser, logout}