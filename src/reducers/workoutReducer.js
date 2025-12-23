import { createSlice } from "@reduxjs/toolkit"


export const workoutSlice = createSlice({
    name:'workout' ,
    initialState:[],

    reducers:{
        createWorkout(state , action){
            const content = action.payload
            state.push(content)
        },
        setWorkouts(state , action){
            return action.payload
        },
        removeWorkout(state , action){
           return state.filter(w=>w.id !== action.payload)
        }
    }
})
export const {createWorkout , setWorkouts , removeWorkout} = workoutSlice.actions
export default workoutSlice.reducer