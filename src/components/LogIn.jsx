import { useState } from "react"
import loginService from '../services/login'
import workoutService from '../services/workouts'
import { setUser } from "../reducers/userReducer"
import {setWorkouts} from "../reducers/workoutReducer"
import { useDispatch } from "react-redux"
import styles from "../designs/LogIn.module.css"
import { useNavigate } from "react-router-dom"
import { createNotification , removeNotification } from "../reducers/notificationReducer"
import Notification from "./Notification"
const LogIn = () => {
  const navigate= useNavigate()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const setNotification =(name,type)=>{
    if(type==="success"){
      dispatch(createNotification({
      type:`${type}`,
      message:`Logged in as ${name}`}))
    }
    else{
      dispatch(createNotification({
      type:`${type}`,
      message:`Wrong Credentials !`}))
    }
    setTimeout(()=>dispatch(removeNotification()), 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
       window.localStorage.setItem('loggedWorkoutTrackerUser', JSON.stringify(user)) 
      dispatch(setUser(user))
      workoutService.setToken(user.token)
      const workouts = await workoutService.getAll()
      dispatch(setWorkouts(workouts))
      setUserName('')
      setPassword('')
      setNotification(user.name , "success")
      navigate('/')
    } 
    catch (error) {
      console.log('error failed : ', error)
      setNotification(error , "error")
    }
  }

  return (
    <><Notification/>
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleLogin}>
        <div className={styles.title}>Log in</div>

        <div className={styles.field}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUserName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.button} type="submit">
          Log in
        </button>
      </form>
    </div>
  </>
  )
}

export default LogIn
