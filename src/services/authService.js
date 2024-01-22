//will start without auth and once we get it working in the backen will add it in

async function singup(user){
    try {
        const res = await axios.post('http://localhost:3000/users', user)
        const json = res.data
        if (json.err) {
            throw new Error(json.err)
        }
    } catch (error) {
        throw error
    }
}


async function login(credentials){
    try {
        const res = await axios.post('http://localhost:3000/users', credentials)
        const json = res.data
        if(json.err){
            throw new Error(json.err)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
export { singup, login}