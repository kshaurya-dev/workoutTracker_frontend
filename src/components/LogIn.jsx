import { useState } from "react"
import loginService from '../services/login'
import { setUser } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
const LogIn=()=>{

    const [username , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin=async event =>{
        event.preventDefault()
        try{
            const user  = await loginService.login({username , password})
            dispatch(setUser(user))
            setUserName('')
            setPassword('')
        }catch(error){
            console.log('error failed : ' , error)
        }
    }
    return(
        <form onSubmit={handleLogin}>
            <div>
                <label>username :</label>
                <input type="text" value={username}
                onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div>
                <label>password :</label>
                <input type="password" value={password}
                onChange={({target})=>setPassword(target.value)}/>
            </div>
            <button type="submit">login</button>
        </form>
    )
}
export default LogIn