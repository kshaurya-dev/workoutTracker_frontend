
import { useState } from "react"
import { useSelector ,  useDispatch} from "react-redux"
import styles from "../designs/Workouts.module.css"
import Notification from "./Notification"
import { setNotification } from "../reducers/notificationReducer"
import { deleteWorkout } from "../reducers/workoutReducer"
import EditForm from "./EditForm"
import Confirm from "./Confirm"
import LoadingOverlay from "./LoadingOverlay"
import SearchField from "./SearchField/SearchField"
import {MONTHS ,YEARS} from '../data/exercises'
export default function Workouts() {

  const dispatch = useDispatch()
  const today =  new Date()

  const [month , setMonth]= useState(today.getMonth())
  const [year , setYear] = useState(today.getFullYear())
console.log(year)
  const handleMonthFilter =(item)=>{
    setMonth(item.id-1)
  }
  const handleYearFilter =(item)=>{
    setYear(item.name)
  }

  const [isDeleting, setIsDeleting]=useState(false)
  const [openIds, setOpenIds] = useState(new Set())
  const [workoutToEdit , setWorkoutToEdit]=useState()
  const [workoutToDelete , setWorkoutToDelete] = useState()
  
  const workoutList=useSelector( state => state.workouts)

  const workouts= workoutList.filter(w=>{
    const date = new Date(w.date)
    return (date.getMonth()===month && date.getFullYear()===year)
  })
  const renderDate = (str) => {
  const date = new Date(str);

  const datePart = date.toLocaleDateString("en-GB");
  const timePart = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart} · ${timePart}`;
};
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

      <div className={styles.header}>
        <div className={styles.title}>My Workouts</div>
        <div className={styles.filterQuery}>

          <SearchField onSelect={(item)=>handleMonthFilter(item)}
            list={MONTHS}
            placeHolder={today.toLocaleString('default', { month: 'long' })}
            field="name"
            />

          <SearchField onSelect={(item)=>handleYearFilter(item)}
            list={YEARS}
            placeHolder={year} field="name"/>

        </div>
      </div>

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
                      {renderDate(w.date)} · {w.duration} min
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
                            {s.reps} × {s.weight}
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
    <div>
     
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

