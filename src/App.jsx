import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import Workouts from "./components/Workouts"
import Add from "./components/Add"
import Landing from "./components/Landing"
import Statistics from "./components/Statistics/Statistics"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"


import { setUser , logOut } from "./reducers/userReducer"

import workoutService from './services/workouts'
import { initializeWorkouts } from "./reducers/workoutReducer"

import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom"
import styles from "./designs/Navbar.module.css"

import Confirm from "./components/Confirm"

const App = () => {
  const [loggingOut, setLoggingOut] = useState(null)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedWorkoutTrackerUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      workoutService.setToken(user.token)
      dispatch(initializeWorkouts())
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logOut())
    setLoggingOut(null)
    window.localStorage.removeItem("loggedWorkoutTrackerUser")
  }

  return (
    <>
      {user && loggingOut && (
        <Confirm
          type="log out"
          message={`Log out as ${user.name}`}
          handleConfirm={handleLogout}
          setState={setLoggingOut}
        />
      )}

      <Router>
        {/*  \NAVBAR */}
        <div className={styles.navbar}>
          <div className={styles.brand}>Tracker</div>

          {!user || user === "" ? (
            <div className={styles.links}>
              <Link className={styles.link} to="/"> Home </Link>
              <Link className={styles.link} to="/login"> Login </Link>
              <Link className={styles.link} to="/signup"> Signup </Link>
            </div>
          ) : (
            <>
              <div className={styles.links}>
                <Link className={styles.link} to="/add"> Add Workout </Link>
                <Link className={styles.link} to="/workouts">My Workouts</Link>
                <Link className={styles.link} to="/stats"> Statistics </Link>
              </div>

              <button className={styles.logout} onClick={() => setLoggingOut(user)}>
                Logout
              </button>
            </>
          )}
        </div>

        {/* ✅ ROUTES */}
        <Routes>
          {/* ------- NOT LOGGED IN ROUTES ------- */}
          {!user || user === "" ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* if they try /workouts without login */}
              <Route path="/workouts" element={<Navigate to="/login" replace />} />
              <Route path="/add" element={<Navigate to="/login" replace />} />
               
            </>
          ) : (
            /* ------- LOGGED IN ROUTES ------- */
            <>
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/add" element={<Add />} />

              {/* if logged in and they go to /login */}
              <Route path="/login" element={<Navigate to="/workouts" replace />} />
              <Route path="/signup" element={<Navigate to="/workouts" replace />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/" element={<Navigate to="/workouts" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  )
}

export default App
