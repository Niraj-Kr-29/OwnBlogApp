import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: true,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        storeLogin: (state,action)=>{
            state.status = true;
            state.userData = action.payload
        },
        storeLogout: ()=>{
            state.status = false;
            state.userData = null
        }
    }
})

export const { storeLogin, storeLogout} = authSlice.actions
export default authSlice.reducer