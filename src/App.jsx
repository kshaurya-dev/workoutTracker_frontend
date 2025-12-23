import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Workouts from './components/Workouts'
import Add from './components/Add'
import Landing from './components/Landing'
import { useDispatch , useSelector} from 'react-redux'
import { useEffect } from 'react'
import { setWorkouts } from './reducers/workoutReducer'
import { setUser } from "./reducers/userReducer"
import workoutService from './services/workouts'
import { BrowserRouter as Router , Route , Link , Routes} from "react-router-dom"
import { removeUser } from "./reducers/userReducer"
import styles from './designs/Navbar.module.css'


const App = ()=>{

  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const initializeWorkouts = async()=>{
    const workouts = await workoutService.getAll()
    dispatch(setWorkouts(workouts))
  }
  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedWorkoutTrackerUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      workoutService.setToken(user.token)
      initializeWorkouts()
    }
  },[dispatch])

  const handleLogout=(event)=>{
    event.preventDefault()
    dispatch(removeUser())
    window.localStorage.removeItem('loggedWorkoutTrackerUser')
  }
  
  if(!user || user===""){
    return(
    <>
    <Router >
        <div className={styles.navbar}>
          <div className={styles.brand}>Tracker</div>
        <div className={styles.links}>
          <Link className={styles.link} to="/">Home</Link>
          <Link className={styles.link} to="/login">Login</Link>
          <Link className={styles.link} to="/signup">Signup</Link>
        </div>
        </div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path ="/signup" element={<SignUp/>}/>
      </Routes>
    </Router>
  </>
  )
  }
  else{
    return(
      <>
      <Router>
        <div className={styles.navbar}>
          <div className={styles.brand}>Tracker</div>
          <div className={styles.links}>
            <Link className={styles.link} to="/add"> Add Workout</Link>
            <Link className={styles.link} to="/">Home</Link>
          </div>
          <button className={styles.logout} onClick={handleLogout}>Logout</button>
        </div>
          <Routes>
            <Route path="/add" element={<Add/>}/>
             <Route path="/" element={<Workouts/>}/>
          </Routes>
      </Router>
      </>
    )
  }
}

export default App
