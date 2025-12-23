import { useState } from "react"
import signupService from '../services/signup'
import styles from '../designs/LogIn.module.css'
import { createNotification, removeNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import Notification from "./Notification"
const SignUp=()=>{

    const dispatch = useDispatch()
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [name , setName] = useState('')

    const setNotification =(name,type)=>{
        if(type==="success"){
          dispatch(createNotification({
          type:`${type}`,
          message:`Signed up as ${name} `}))
        }
        else{
          dispatch(createNotification({
          type:`${type}`,
          message:`couldn't sign you up `
        }))
        }
        setTimeout(()=>dispatch(removeNotification()), 5000)
      }
    const handleSignup = async event=>{
        event.preventDefault()
        try{
            const newUser = await signupService.signup({username , name , password})
            console.log(newUser)
            setNotification(newUser.name , "success")
            setUsername('')
            setPassword('')
            setName('')
        }
        catch(error){
            console.log("creation of new user failed " , error)
            setNotification(error , "error")
        }
    }
    return(
        <>
        <Notification/>
        <div className={styles.page} onSubmit={handleSignup}>
            <form className={styles.card}>
                <div className={styles.title}>Sign Up</div>

                <div className={styles.field}>
                    <label>Name </label>
                    <input type="text" value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className={styles.field}>
                    <label>Username </label>
                    <input type="text" value={username} 
                        onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div className={styles.field}>
                    <label>Password </label>
                    <input type="password" value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className={styles.button} type="submit">Signup</button>
            </form>
        </div>
    </>
    )
}
export default SignUp