import { useState } from "react"
import styles from "../designs/Add.module.css"
import { useDispatch } from "react-redux"
import { createWorkout } from "../reducers/workoutReducer"
import workoutService from '../services/workouts'
import Notification from "./Notification"
import { createNotification,removeNotification } from "../reducers/notificationReducer"
import { useNavigate } from "react-router-dom"
const ExerciseForm=({addExercise , setShowExercise , index})=>{

    const [showSet , setShowSet]=useState(false)
    const [exercise , setExercise]=useState({
        name:"",
        sets:[]
    })

    const [weight , setWeight]=useState()
    const [reps , setReps]=useState()

    const addSet=()=>{  
        const newSet={ weight:weight , reps:reps }
        const updatedExercise={...exercise , sets:[...exercise.sets ,newSet]}
        console.log(updatedExercise)
        setExercise(updatedExercise)
        setShowSet(!showSet)
        setReps()
        setWeight()
    }
    const saveExercise=()=>{
        console.log(exercise)
        addExercise(exercise)
        setExercise({
            name:"",
            sets:[]})
        setShowExercise(false)
    }
    return(
    <>
    <div className={styles.exerciseCard}>
        <div className={styles.exerciseTopRow}>
            <div className={styles.exerciseName}>
                <label>Exercise{index + 1}:</label>
                <input value={exercise.name}
                className={styles.mediumInput}
                onChange={(e) => setExercise({ ...exercise, name: e.target.value })}/>
            </div>

    <div className={styles.setsInline}>
      {exercise.sets.map((set, i) => (
        <span key={i} className={styles.set}>
          {set.reps} × {set.weight}
        </span>
      ))}
    </div>

  </div>

  {!showSet && (
    <button className={styles.saveSetButton} onClick={() => setShowSet(!showSet)}>
      Add Set
    </button>
  )}

  {showSet && (
    <div className={styles.setRow}>

      <label className={styles.setLabel}>reps</label>
      <input
        className={styles.smallInput}
        value={reps}
        onChange={(e) => setReps(e.target.value)}/>

      <label className={styles.setLabel}>weight</label>
      <input
        className={styles.smallInput}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}/>

      <button className={styles.saveSetButton} onClick={addSet}>
        Save Set
      </button>
    </div>
  )}
  <button type="submit" 
  onClick={saveExercise} className={styles.saveExerciseButton}>save Exercise</button>
</div>
</>
)}
const Add=()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showExercise , setShowExercise]=useState(false)
    const [workout , setWorkout]=useState({
        name:"",
        duration:"" , 
        notes:"",
        exercises:[]
    })
    const setNotification =(name,type)=>{
        if(type==="success"){
          dispatch(createNotification({
          type:`${type}`,
          message:`${name} was added.`}))
        }
        else{
          dispatch(createNotification({
          type:`${type}`,
          message:`${name} couldn't be added.`
        }))
        }
        setTimeout(()=>dispatch(removeNotification()), 5000)
      }
        const addWorkout = async(event)=>{
          event.preventDefault()
          const currentDate = new Date()
          try{
            const newWorkout={...workout ,date:currentDate}
            const savedWorkout=await workoutService.create(newWorkout)
            dispatch(createWorkout(savedWorkout))
            setWorkout({
              name: "",duration: "",notes: "",exercises: []
            })
            setNotification(workout.name, "success")
            navigate('/')
          }
          catch(error){
            console.log("error occured while creating a new workout : ", error)
            setNotification(workout.name, "error")
          }
    
        }

    const addExercise=(newExercise)=>{
        const updatedWorkout={...workout , exercises:[...workout.exercises , newExercise]}
        setWorkout(updatedWorkout)
    }
    return(
        <>
        <div className={styles.page}>
            <div className={styles.card}>

                <div className={styles.title}>Add Workout</div>

                <form onSubmit={addWorkout}>
                    <div className={`${styles.section} ${styles.row}`}>

                        <div className={styles.field}>
                            <label>Workout Name : </label>
                            <input value={workout.name}
                            onChange={(e)=>setWorkout({...workout , name:e.target.value})}/>
                        </div>

                        <div className={styles.field}>
                            <label>Duration (min): </label>
                            <input value={workout.duration}
                            onChange={e=>setWorkout({...workout , duration:e.target.value})}/>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.field}>
                            <label>Notes :  </label>
                            <input value={workout.notes} className={styles.notesInput}
                            onChange={e=>setWorkout({...workout , notes:e.target.value})}/>
                        </div>
                    </div>
                    {workout.exercises.map((ex, idx) => (
                        <div key={idx} className={styles.exercise}>
                            <div className={styles.exerciseRow}>
                                <div className={styles.exerciseNameText}>{ex.name}</div>
                                <div className={styles.exerciseSets}>
                                    {ex.sets.map((s, i) => (
                                        <span key={i} className={styles.set}>{s.weight} × {s.reps}</span>
                                        ))}
                                </div>
                            </div>
                            </div>
                        ))}
                    {!showExercise && (
                        <div className={styles.addExerciseRow}>
                            <button type="button" className={styles.addExerciseButton}
                            onClick={() => setShowExercise(true)}>
                                + Add exercise
                                </button>
                        </div>
                    )}
                    {showExercise && (
                        <ExerciseForm
                        index={workout.exercises.length}
                        addExercise={addExercise}
                        setShowExercise={setShowExercise}
                    />
                    )}
                <button type="button" className={`${styles.button} ${styles.primary}`}  onClick={addWorkout}>
                          Save workout
                        </button>
                </form>
                
            </div>
        </div>
    </>
    )
}
export default Add