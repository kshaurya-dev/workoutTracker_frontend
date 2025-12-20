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
        }
    }
})
export const {createWorkout , setWorkouts} = workoutSlice.actions
export default workoutSlice.reducer