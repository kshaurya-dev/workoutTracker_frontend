import { useState } from "react"
import styles from "../designs/Add.module.css"
import { useDispatch } from "react-redux"
import { createWorkout } from "../reducers/workoutReducer"
import workoutService from '../services/workouts'
import Notification from "./Notification"
import { createNotification,removeNotification } from "../reducers/notificationReducer"
import { useNavigate } from "react-router-dom"
const ExerciseForm = ({ index ,exercise, updateExercise, onAddSet }) => {
  return (
    <div className={styles.exerciseCard}>
      <div className={styles.exerciseTitle}>Exercise {index+1}</div>

      <div className={styles.field}>
        <label>Exercise name</label>
        <input
          type="text"
          value={exercise.name}
          onChange={e => updateExercise("exercise", e.target.value)}
        />
      </div>

      {exercise.sets.map((s, i) => (
        <div key={i} className={styles.setRow}>
          <input
            className={styles.smallInput}
            placeholder="Weight"
            value={s.weight}
            onChange={e =>
              updateExercise("set", {
                setIndex: i,
                field: "weight",
                value: e.target.value,
              })
            }
          />
          <input
            className={styles.smallInput}
            placeholder="Reps"
            value={s.reps}
            onChange={e =>
              updateExercise("set", {
                setIndex: i,
                field: "reps",
                value: e.target.value,
              })
            }
          />
        </div>
      ))}

      <button type="button" className={styles.button} onClick={onAddSet}>
        + Add set
      </button>
    </div>
  )
}

const Add=()=>{
  const navigate=useNavigate()
  const dispatch = useDispatch()
    const[workout , setWorkout] = useState({
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
        console.log("error occured while creating a newworkout : ", error)
        setNotification(workout.name, "error")
      }

    }
    const onAddSet = (i)=>{
        setWorkout( prev =>{
            const exercises = prev.exercises.map((ex , index)=>
                index===i ? {...ex , sets : [...ex.sets , {weight:"" , reps:""}]} : ex
            )
            return {...prev , exercises}
        })
    }
    const updateExercise = (exerciseIndex ,type ,payload)=>{
        setWorkout( prev => {
            const exercises = prev.exercises.map((ex , i)=>{
                if(i != exerciseIndex)return ex
                if(type === "exercise")return {...ex , name:payload}
                if(type === "set"){
                    const {setIndex , field, value}=payload
                    const sets = ex.sets.map((s,j)=>
                    j === setIndex ? {...s , [field]:value} : s)
                    return {...ex , sets}
                }
                return ex
            })
            return {...prev , exercises}
        })
    }
    const addExercise = ()=>{
        setWorkout(prev=>({
            ...prev,
            exercises: [...prev.exercises , {name:"" ,sets:[]} ]
        }))
    }
    return (
      <><Notification/>
  <div className={styles.page}>
    <div className={styles.card}>
      <div className={styles.title}>Add Workout</div>

      <form onSubmit={addWorkout}>
        <div className={`${styles.section} ${styles.row}`}>
          <div className={styles.field}>
            <label>Workout name</label>
            <input
              value={workout.name}
              onChange={e =>
                setWorkout(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className={styles.field}>
            <label>Duration (min)</label>
            <input
              value={workout.duration}
              onChange={e =>
                setWorkout(prev => ({ ...prev, duration: e.target.value }))
              }
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.field}>
            <label>Notes</label>
            <input
              value={workout.notes}
              onChange={e =>
                setWorkout(prev => ({ ...prev, notes: e.target.value }))
              }
            />
          </div>
        </div>

        {workout.exercises.map((exercise, i) => (
          <ExerciseForm
            key={i}
            index={i}
            exercise={exercise}
            onAddSet={() => onAddSet(i)}
            updateExercise={(type, payload) =>
              updateExercise(i, type, payload)
            }
          />
        ))}
      </form>

      <div className={styles.row}>
        <button type="button" className={styles.button} onClick={addExercise}>
          + Add exercise
        </button>

        <button type="button" className={`${styles.button} ${styles.primary}`}  onClick={addWorkout}>
          Save workout
        </button>
      </div>
    </div>
  </div>
  </>
)

}
export default Add