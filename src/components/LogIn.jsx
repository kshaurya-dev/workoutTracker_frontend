import { useState } from "react"
import loginService from '../services/login'
import workoutService from '../services/workouts'
import { setUser } from "../reducers/userReducer"
import { initializeWorkouts } from "../reducers/workoutReducer"
import { useDispatch } from "react-redux"
import styles from "../designs/LogIn.module.css"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"
import { setNotification } from "../reducers/notificationReducer"

const LogIn = () => {

  const navigate= useNavigate()
  const dispatch = useDispatch()
  
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem('loggedWorkoutTrackerUser', JSON.stringify(user)) 

      dispatch(setUser(user))
      workoutService.setToken(user.token)
      dispatch(initializeWorkouts())

      setUserName('')
      setPassword('')

      dispatch(setNotification({
        type:`success`,
        message:`Logged in as ${user.name}`
      }))

      navigate('/workouts')
    } 
    catch (error) {
      console.log('error failed : ', error)

      dispatch(setNotification({
        type:`error`,
        message:`Wrong Credentials !`
      }))
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
