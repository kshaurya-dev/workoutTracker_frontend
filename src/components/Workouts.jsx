
import { useState } from "react"
import { useSelector ,  useDispatch} from "react-redux"
import styles from "../designs/Workouts.module.css"
import Notification from "./Notification"
import { createNotification , removeNotification } from "../reducers/notificationReducer"
import workoutService from "../services/workouts"
import { removeWorkout } from "../reducers/workoutReducer"
export default function Workouts() {

  const dispatch = useDispatch()
  const [openIds, setOpenIds] = useState(new Set())
  const workouts=useSelector( state => state.workouts)

  const setNotification =(name,type)=>{
      if(type==="success"){
        dispatch(createNotification({
        type:`${type}`,
        message:`${name} was deleted.`}))
      }
      else{
        dispatch(createNotification({
        type:`${type}`,
        message:`${name} couldn't be deleted.`
      }))
      }
      setTimeout(()=>dispatch(removeNotification()), 5000)
    }
  
  const handleDelete = async(id , name)=>{
    event.preventDefault()
    try{
      const response = await workoutService.remove(id)
      dispatch(removeWorkout(id))
      setNotification(name , "success")
    }
    catch(error){
      console.log("some error occured while deleting the workout : " , error)
      setNotification(name , "error")
    }
  }
  return (
  <>
    {/* global toast */}
    <Notification />

    {/* page wrapper */}
    <div className={styles.page}>
      <h1 className={styles.title}>My Workouts</h1>

      {/* workout list */}
      <div className={styles.list}>
        {workouts.map(w => {
          const open = openIds.has(w.id)

          return (
            <div key={w.id} className={styles.card}>

              {/* always-visible row */}
              <div className={styles.cardTopRow}>

                {/* toggle open/close */}
                <button
                  className={styles.cardHeader}
                  onClick={() => {
                    const next = new Set(openIds)
                    open ? next.delete(w.id) : next.add(w.id)
                    setOpenIds(next)
                  }}
                >
                  <div>
                    <div className={styles.cardTitle}>{w.name}</div>
                    <div className={styles.meta}>
                      {w.date.slice(0,10)} · {w.duration} min
                    </div>
                  </div>
                </button>

                {/* delete workout */}
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(w.id , w.name)}
                  title="Delete workout"
                >
                  ✕
                </button>
              </div>

              {/* expandable details */}
              <div className={`${styles.expand} ${open ? styles.open : ""}`}>
                <div className={styles.expandInner}>

                  {/* exercises */}
                  {w.exercises.map(ex => (
                    <div key={ex.name} className={styles.exercise}>
                      <div className={styles.exerciseName}>{ex.name}</div>

                      {/* sets */}
                      <div className={styles.setRow}>
                        {ex.sets.map(s => (
                          <span key={s.id} className={styles.set}>
                            {s.weight} × {s.reps}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* notes */}
                  <div className={styles.notes}>{w.notes}</div>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  </>
)

}

