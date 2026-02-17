import axios from "axios"

const baseUrl = `${import.meta.env.VITE_API_URL}/api/signup`

const signup = async(body)=>{
    const response = await axios.post(baseUrl , body)
    return response.data
}
export default {signup}