
import { useState } from "react"
import { useSelector ,  useDispatch} from "react-redux"
import styles from "../designs/Workouts.module.css"
import Notification from "./Notification"
import { setNotification } from "../reducers/notificationReducer"

import { deleteWorkout } from "../reducers/workoutReducer"
import EditForm from "./EditForm"
import Confirm from "./Confirm"
import LoadingOverlay from "./LoadingOverlay"

export default function Workouts() {

  const dispatch = useDispatch()
   const [isDeleting, setIsDeleting]=useState(false)
  const [openIds, setOpenIds] = useState(new Set())
  const workouts=useSelector( state => state.workouts)
  const [workoutToEdit , setWorkoutToEdit]=useState()
  const [workoutToDelete , setWorkoutToDelete] = useState()

  const handleDelete = async()=>{
    const timer = setTimeout(()=> setIsDeleting(true), 10)
    try{
      await dispatch(deleteWorkout( workoutToDelete.id))
      dispatch(setNotification({
        type:`success`,
        message:`${workoutToDelete.name} was deleted.`
      }))
      setWorkoutToDelete(null)
    }
    catch(error){
     setIsDeleting(false)
     setWorkoutToDelete(null)
     console.log("control was here")
    }
    finally{
      setIsDeleting(false)
      clearTimeout(timer)
    }
  }
  const handleEdit = (id)=>{
    const workout = workouts.find(w=>w.id===id)
    setWorkoutToEdit(workout)
  }
  if(!workoutToEdit){
    return (
  <>
    { 
    workoutToDelete && 
    <Confirm type="delete" 
    message={`Delete ${workoutToDelete.name}`}
    handleConfirm={handleDelete} setState={setWorkoutToDelete}/>
    }
    <LoadingOverlay show={isDeleting} text={'Deleting...'}/>
    <Notification />
    <div className={styles.page}>
      <h1 className={styles.title}>My Workouts</h1>

      <div className={styles.list}>
        {workouts.map(w => {
          const open = openIds.has(w.id)

          return (
            <div key={w.id} className={styles.card}>

              <div className={styles.cardTopRow}>

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
                      {w.date.slice(0,10)} · {w.date.slice(12,16)} · {w.duration} min
                    </div>
                  </div>
                </button>

                {/* edit buttons*/}
                <div className={styles.actionBtns}>
                  <button className={styles.editBtn} type="button"
                  onClick={()=>handleEdit(w.id)}>✎</button>

                  <button className={styles.deleteBtn} 
                  type="button"
                  onClick={()=>setWorkoutToDelete(w)}>✕</button>
                </div>
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
                        ))}</div>
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
else{
  return(
    <EditForm workout={workoutToEdit} setWorkoutToEdit={setWorkoutToEdit}/>
  )
}

}

