import { useState } from "react"
import WorkoutForm from "./WorkoutForm"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { editWorkout } from "../reducers/workoutReducer"
import LoadingOverlay from "./LoadingOverlay"
const EditForm=({workout , setWorkoutToEdit})=>{

    const [showLoading , setShowLoading]=useState(false)
    const [w , setW]=useState(workout)
    const dispatch = useDispatch()

    const addWorkout = async(event)=>{
        const timer = setTimeout(()=>setShowLoading(true),200)
        event.preventDefault()
        try{
            const editedWorkout={
                name : w.name,
                duration : w.duration , 
                notes: w.notes ,
                exercises: w.exercises,
                date: new Date(w.date)
            }
            dispatch(editWorkout(workout.id,editedWorkout))
            dispatch(setNotification({
                type:`success`,
                message:`${w.name} was edited.`
            }))
            setWorkoutToEdit()
        }
        catch(error){
            console.log("error occured in editing workout = " , error)
            dispatch(setNotification({
            type:`error`,
            message:`${w.name} couldn't be edited.`
        }))
        }
        finally{
                setShowLoading(false)
                clearTimeout(timer)
            }
    }
    return(
        <>
        <LoadingOverlay show={showLoading}text={'Saving Workout...'}/>
        <WorkoutForm workout={w} setWorkout={setW}  addWorkout={addWorkout}/>
        </> 
    )
}
export default EditForm