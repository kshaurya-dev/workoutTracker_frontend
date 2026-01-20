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
        },
        editWorkout(state , action){
            return state.map(w=>w.id === action.payload.id ? action.payload : w)
        }
    }
})

export const {createWorkout , setWorkouts , removeWorkout , editWorkout} = workoutSlice.actions
export default workoutSlice.reducer