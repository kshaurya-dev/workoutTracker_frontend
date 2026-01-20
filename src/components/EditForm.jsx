import { useState } from "react"
import WorkoutForm from "./WorkoutForm"
import { createNotification,removeNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import workoutService from '../services/workouts'
import { editWorkout } from "../reducers/workoutReducer"

const EditForm=({workout , setWorkoutToEdit})=>{

    const [w , setW]=useState(workout)
    const dispatch = useDispatch()

    const addWorkout = async(event)=>{
        event.preventDefault()
        try{
            const editedWorkout={
                name : w.name,
                duration : w.duration , 
                notes: w.notes ,
                exercises: w.exercises,
                date: w.date
            }
            const changedWorkout = await workoutService.change(workout.id , editedWorkout)
            dispatch(editWorkout(changedWorkout))
            setNotification(w.name, "success")
            setWorkoutToEdit()
        }
        catch(error){
            console.log("error occured in editing workout = " , error)
            setNotification(w.name, "error")
        }
        setTimeout(()=>dispatch(removeNotification()), 5000)
    }
    const setNotification =(name,type)=>{
        if(type==="success"){
            dispatch(createNotification({
                type:`${type}`,
                message:`${name} was edited.`}))
            }
        else{
            dispatch(createNotification({
            type:`${type}`,
            message:`${name} couldn't be edited.`
        }))
        }
        setTimeout(()=>dispatch(removeNotification()), 5000)
    }
    return(
        <>
        <WorkoutForm workout={w} setWorkout={setW}  addWorkout={addWorkout}/>
        </> 
    )
}
export default EditForm