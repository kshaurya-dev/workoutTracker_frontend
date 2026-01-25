import WorkoutForm from "./WorkoutForm"
import { useState } from "react"
import { useDispatch ,} from "react-redux"
import { useNavigate } from "react-router-dom"
import { setNotification } from "../reducers/notificationReducer"
import { appendWorkout } from "../reducers/workoutReducer"


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
        const currentDate = new Date()
        try{
            const newWorkout={...workout ,date:currentDate}
            dispatch(appendWorkout(newWorkout))
            setWorkout({
                name: "",duration: "",notes: "",exercises: []
            })
            dispatch(setNotification({
                type:`success`,
                message:`${workout.name} was added.`}))
            navigate('/')
        }
        catch(error){
            console.log("error occured while creating a new workout : ", error)
            dispatch(setNotification({
            type:`error`,
            message:`${workout.name} couldn't be added.`
        }))
        }
    }
    return(
        <>
        <WorkoutForm workout={workout} setWorkout={setWorkout}
        addWorkout={addWorkout}/>
        </>
    )
}
export default Add