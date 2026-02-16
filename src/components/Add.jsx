import WorkoutForm from "./WorkoutForm"
import { useState } from "react"
import { useDispatch ,} from "react-redux"
import { useNavigate } from "react-router-dom"
import { setNotification } from "../reducers/notificationReducer"
import { appendWorkout } from "../reducers/workoutReducer"
import Notification from "./Notification"
import LoadingOverlay from "./LoadingOverlay"
const Add=()=>{
    const navigate =useNavigate()
    const dispatch = useDispatch()

    const [showLoading , setShowLoading]=useState(false)

    const [workout , setWorkout]=useState({
            name:"",
            duration:"" , 
            notes:"",
            date:"",
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
            const timer = setTimeout(()=>setShowLoading(true),200)
            try{
                console.log(workout)
            await dispatch(appendWorkout({...workout,date:new Date(workout.date)}))
            setWorkout({
                name: "",duration: "",notes: "",date:"",exercises: []
            })
            dispatch(setNotification({
                type:`success`,
                message:`${workout.name} was added.`}))
                navigate('/')
            }
            catch(error){
                //
            }
            finally{
                setShowLoading(false)
                clearTimeout(timer)
            }
        }
        
    }
    return(
        <>
        <LoadingOverlay show={showLoading}text={'Saving Workout...'}/>
        <Notification/>
        <WorkoutForm workout={workout} setWorkout={setWorkout}
        addWorkout={addWorkout}/>
        </>
    )
}
export default Add