import { useState } from "react"
import styles from "../designs/Add.module.css"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import Notification from "./Notification"
import ExerciseSelect from "./ExerciseSelect/ExerciseSelect"
const ExerciseForm=({addExercise , setShowExercise , index})=>{
    const dispatch = useDispatch()
    const [showSet , setShowSet]=useState(false)
    const [exercise , setExercise]=useState({
        name:"",
        id:"",
        primaryMuscle:"",
        sets:[]
    })

    const [weight , setWeight]=useState()
    const [reps , setReps]=useState()

    const addSet=(e)=>{ 
        e.preventDefault() 
        if(!weight || !reps){
            dispatch(setNotification({
                type:'error',
                message:'set fields cannot be empty'
            }))
        }
        else{
            const newSet={ weight:weight , reps:reps }
            const updatedExercise={...exercise , sets:[...exercise.sets ,newSet]}
            console.log(updatedExercise)
            setExercise(updatedExercise)
            setShowSet(!showSet)
            setReps()
            setWeight()
        }
    }
    const saveExercise=(e)=>{
        e.preventDefault()
        if(exercise.name===''){
            dispatch(setNotification({
                type:'error',
                message:'Exercise Name is required'
            }))
        }
        else if(!exercise.sets.length){
            dispatch(setNotification({
                type:'error',
                message:'set field is required'
            }))
        }
        else{
            console.log(exercise)
            addExercise(exercise)
            setExercise({
                name:"",
                sets:[]})
                setShowExercise(false)
            }
    }
    return(
    <>
    <Notification/>
    <div className={styles.exerciseCard}>
        <div className={styles.exerciseTopRow}>
            <div className={styles.exerciseName}>
                <label>Exercise{index + 1}:</label>
                <ExerciseSelect  onSelect={(ex) =>setExercise({...exercise,
                id: ex.id,
                name: ex.name,
                primaryMuscle: ex.primaryMuscle,})
                }/>
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

      <button className={styles.saveSetButton} onClick={(e)=>addSet(e)}>
        Save Set
      </button>
    </div>
  )}
  <button type="submit" 
  onClick={(e)=>saveExercise(e)} className={styles.saveExerciseButton}>save Exercise</button>
</div>
</>
)}

const WorkoutForm=({workout , setWorkout , addWorkout})=>{
    const [showExercise , setShowExercise]=useState(false)

    const handleExerciseDelete=(idx)=>{
        console.log(workout.exercises[idx])
        setWorkout({...workout,
            exercises: workout.exercises.filter((_, i) => i !== idx)
        })
    }
        
    const addExercise=(newExercise)=>{
        const updatedWorkout={...workout , exercises:[...workout.exercises , newExercise]}
        setWorkout(updatedWorkout)
    }
    const handleAddWorkout=(workout)=>{
        
    }
    return(
        <>
        <div className={styles.page}>
            <div className={styles.card}>

                <div className={styles.title}>Add Workout</div>

                <form onSubmit={handleAddWorkout}>
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
                                <div className={styles.actionBtns}>
                                    <button className={styles.deleteBtn} 
                                        type="button"
                                        onClick={()=>handleExerciseDelete(idx)}>✕</button>
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
export default WorkoutForm