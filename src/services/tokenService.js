import {jwtDecode} from 'jwt-decode'


function getUserFromToken(){
    const token = getToken()
    console.log(token)
    return token ? jwtDecode(token).user:null
}

function setToken(token){
    localStorage.setItem('token', token)
}

function getToken(){
    let token = localStorage.getItem('token')
    if(token){
        const payload = jwtDecode(token)
        if(payload.exp < Date.now()/1000){
            localStorage.removeItem('token')
            token=null
        }
    }
    return token
}

function removeToken(){
    localStorage.removeItem('token')
}

function getProfileFromToken() {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        console.log("Decoded Token Payload:", payload);
        const username = payload.user.username;
        console.log("Profile ID from Token:", username);
        return username;
    }
    return null;
}

export{setToken, getUserFromToken, getToken, removeToken, getProfileFromToken}