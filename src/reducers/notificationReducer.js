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
        removeNotification(){
            return {
                type:null,
                message:null
            }
        }
    }
})
let timeoutId=null
const {createNotification , removeNotification} = notificationSlice.actions
export const setNotification=({type,message} , seconds=5)=>{
    return (dispatch)=>{

        dispatch(createNotification({type ,message}))

        if(timeoutId) clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
        dispatch(removeNotification())
        }, seconds * 1000)
    }
}
export default notificationSlice.reducer