//will start without auth and once we get it working in the backen will add it in

async function singup(user){
    //this gets exported to the signup form
    try {
        //will come back and change the route not created yet
        const res = await axios.post('http://localhost:3000/users', user)
        const json = res.data
        if (json.err) {
            throw new Error(json.err)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export { singup, }