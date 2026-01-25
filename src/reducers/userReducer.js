import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
export const userSlice = createSlice({
    name:'user',
    initialState:null,
    reducers:{
        setUser(state , action){
            return action.payload
        },
        removeUser(){
            return null
        }
    }
})
export const logIn=(username, password)=>{
    return async(dispatch)=>{
        const user = await loginService.login({ username, password })
        dispatch(setUser(user))
        console.log("logged in as :" ,user)
    }
}
export const logOut=()=>{
    return async(dispatch)=>{
        dispatch(removeUser())
    }
}
const {removeUser} = userSlice.actions
export const {setUser}  = userSlice.actions
export default userSlice.reducer