    import { createSlice } from "@reduxjs/toolkit"
    import workoutService from '../services/workouts'
    import { setNotification } from "./notificationReducer"
    export const workoutSlice = createSlice({
        name:'workout' ,
        initialState:[],

        reducers:{
            createWorkout(state , action){
                const content = action.payload
                state.push(content)
                state.sort((a,b)=> new Date(b.date) - new Date(a.date))
            },
            setWorkouts(state , action){
                return action.payload.sort((a,b)=> new Date(b.date) - new Date(a.date))
            },
            removeWorkout(state , action){
            return state.filter(w=>w.id !== action.payload)
            },
            edit(state , action){
                return state.map(w=>w.id === action.payload.id ? action.payload : w)
            }
        }
    })
    const {setWorkouts , createWorkout , removeWorkout , edit} = workoutSlice.actions

    //thunks

    export const initializeWorkouts=()=>{
        return async(dispatch)=>{
            const workouts = await workoutService.getAll()
            dispatch(setWorkouts(workouts))
            console.log("workouts fetched")
        }
    }
    export  const appendWorkout=(content)=>{
        return async(dispatch)=>{
            try{
                const newWorkout=await workoutService.create(content)
                dispatch(createWorkout(newWorkout))
            }
            catch(error){
                dispatch(setNotification({
                type:`error`,
                message:`${content.name} couldn't be added.`
            }))
            throw error
            }
        }
    }
    export const deleteWorkout = (id)=>{
        return async(dispatch)=>{
            try{
                const response= await workoutService.remove(id)
                dispatch(removeWorkout(id))
            }
            catch(error){
                dispatch(setNotification({
                type:`error`,
                message:`${error.message}`
            }))
            throw error
            }
        }
    }
    export const editWorkout=(id , workout)=>{
        return async(dispatch)=>{
            const response = await  workoutService.change(id , workout)
            dispatch(edit(response))
        }
    }

    export default workoutSlice.reducer