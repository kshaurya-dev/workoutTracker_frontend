import WorkoutForm from "./WorkoutForm"
import { useState } from "react"
import { useDispatch ,} from "react-redux"
import { useNavigate } from "react-router-dom"
import { setNotification } from "../reducers/notificationReducer"
import { appendWorkout } from "../reducers/workoutReducer"
import Notification from "./Notification"


const Add=()=>{
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const [workout , setWorkout]=useState({
            name:"",
            duration:"" , 
            notes:"",
            exercises:[]
    })
    const addWorkout =async(event)=>{
        event.preventDefault()
        if(!workout.name){
            dispatch(setNotification({
            type:`error`,
            message:`workout name is required.`}))
        }
        else if(!workout.exercises.length){
            dispatch(setNotification({
            type:`error`,
            message:`exercises are required`}))
        }
        else{
            try{
                const currentDate = new Date()
            const newWorkout={...workout ,date:currentDate}
            await dispatch(appendWorkout(newWorkout))
            setWorkout({
                name: "",duration: "",notes: "",exercises: []
            })
            dispatch(setNotification({
                type:`success`,
                message:`${workout.name} was added.`}))
                navigate('/')
            }
            catch(error){
                //
            }
        }
        
    }
    return(
        <>
        <Notification/>
        <WorkoutForm workout={workout} setWorkout={setWorkout}
        addWorkout={addWorkout}/>
        </>
    )
}
export default Add