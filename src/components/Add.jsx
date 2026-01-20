import WorkoutForm from "./WorkoutForm"
import { useState } from "react"
import { useDispatch ,} from "react-redux"
import { useNavigate } from "react-router-dom"
import { createNotification,removeNotification } from "../reducers/notificationReducer"
import { createWorkout } from "../reducers/workoutReducer"
import workoutService from '../services/workouts'

const Add=()=>{
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const [workout , setWorkout]=useState({
            name:"",
            duration:"" , 
            notes:"",
            exercises:[]
    })
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
    return(
        <>
        <WorkoutForm workout={workout} setWorkout={setWorkout}
        addWorkout={addWorkout}/>
        </>
    )
}
export default Add