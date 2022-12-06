import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { account } from "../../../appwrite/appwriteConfig";


const profileState={
    isFetching:false,
    id:"",
    error:"",
    name:"",
    email:""
}

export const fetchAccountData=createAsyncThunk("/profile/fetchAccountData",async(_,{rejectWithValue})=>{
    try{
        const data=await account.get();
        return data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

const profileSlice=createSlice({
    name:"profile",
    initialState:profileState,
    extraReducers:(builder)=>{
        builder.addCase(fetchAccountData.pending,(state)=>{
            state.isFetching=true;
        })
        builder.addCase(fetchAccountData.fulfilled,(state,action)=>{
            state.id=action.payload.$id;
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.isFetching=false;
        })
        builder.addCase(fetchAccountData.rejected,(state,action)=>{
            state.error=action.payload;
            state.isFetching=false;
        })
    }
})

export default profileSlice.reducer;