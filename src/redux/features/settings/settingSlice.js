import { createSlice } from "@reduxjs/toolkit";

const settingState={
    darkMode:true
}

const settingSlice=createSlice({
    name:"settings",
    initialState:settingState,
    reducers:{
       changeTheme:(state)=>{
        state.darkMode=!state.darkMode
       } 
    }
})

export const {changeTheme}=settingSlice.actions;
export default settingSlice.reducer;