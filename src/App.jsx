import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Workouts from './components/Workouts'
import Add from './components/Add'
import Landing from './components/Landing'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setWorkouts } from './reducers/workoutReducer'
import workoutService from './services/workouts'

/*import { BrowserRouter as Router , Route , Link , Routes , useLocation } from "react-router-dom"
const NavBar = ()=>{
  const location = useLocation()
  const path = location.pathname

  if(path==="/")return null;

  const padding ={
    padding : 5
  }

  return(
     <div>
      {path === "/signup" && (
        <Link style={padding} to="/login">log in</Link>
      )}

      {path === "/login" && (
        <Link style={padding} to="/signup">sign up</Link>
      )}

      {(path === "/workouts" || path === "/add") && (
        <>
          <Link style={padding} to="/signup">sign up</Link>
          <Link style={padding} to="/login">log in</Link>
          <Link style={padding} to="/workouts">my workouts</Link>
          <Link style={padding} to="/add">add workout</Link>
        </>
      )}
    </div>
  )
}
const  App=()=> {
  //const [count, setCount] = useState(0)
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<LogIn/>}></Route>
        <Route path="/workouts" element={<Workouts/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
      </Routes>
    </Router>
  )
}

/*const App  = ()=>{
  const dispatch=useDispatch()
  useEffect( ()=>{
    workoutService.getAll().then(  workouts => dispatch(setWorkouts(workouts)))
  } , [dispatch])
  return(
    <>
    <Workouts/>
    </>
  )
}*/
const App = ()=>{
  return(
    //<Workouts/>
    <Add/>
  )
}
export default App
