import * as tokenService from './tokenService.js'

function getUser(){
    return tokenService.getUserFromToken()
}

async function singup(user){
    try {
        const res = await axios.post('http://localhost:3000/signup', user)
        const json = res.data
        if(json.token){
            tokenService.setToken(json.token)
            return json.token
        }
        if (json.err) {
            throw new Error(json.err)
        }
    } catch (error) {
        throw error
    }
}


async function login(credentials){
    try {
        const res = await axios.post('http://localhost:3000/signin', credentials)
        const json = res.data
        if(json.err){
            throw new Error(json.err)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

function logout(){
    tokenService.removeToken()
}
export { singup, login, getUser, logout}