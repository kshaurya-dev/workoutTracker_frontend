import axios from "axios"

const baseUrl = 'http://localhost:3001/api/users'

const signup = async(body)=>{
    const response = await axios.post(baseUrl , body)
    return response.data
}
export default {signup}