import { createSlice } from "@reduxjs/toolkit"

const initialState={
    type:null , 
    message:null
}

export const notificationSlice = createSlice({
    name:'notification' , 
    initialState,
    reducers:{
        createNotification(state , action){
           return action.payload
        },
        removeNotification(state , action){
            return {
                type:null,
                message:null
            }
        }
    }
})
export const {createNotification , removeNotification} = notificationSlice.actions
export default notificationSlice.reducer