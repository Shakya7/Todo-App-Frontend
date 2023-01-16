import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { account } from "../../../appwrite/appwriteConfig";
import axios from "axios";


const loginState={
    isLoading:false,
    isLogged:false,
    userID:"",
    error:"",
}
export const signupFunction=createAsyncThunk("/login/signupFunction",async({email,password,name},{rejectWithValue})=>{
    try{
        const data=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/signup`,{
            email,
            password,
            name
        },{withCredentials:true});
        console.log(data);
        return data.data.data.user._id;
    }catch(err){
        console.log(err);
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue(err.message);
    }
})


export const loginFunction=createAsyncThunk("/login/loginFunction",async({email,password},{rejectWithValue})=>{
    try{
        const data=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,{
            email,
            password
        },{withCredentials:true});
        return data.data.data.user._id;
    }catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue(err.message);
    }
})

export const logout=createAsyncThunk("/login/logout",async(_,{rejectWithValue})=>{
    try{
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`,{withCredentials:true});
    }catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue(err.message);
    }
})

const loginSlice=createSlice({
    name:"login",
    initialState:loginState,
    reducers:{
        removeError:(state)=>{
            state.error=""
        },
        sessionPresent:(state)=>{
            state.isLogged=true;
            state.error="";
            state.isLoading=false;
        },  
        authenticate:(state,action)=>{
            state.isLogged=true;
            state.error="";
            state.isLoading=false;
            state.userID=action.payload;
        }
    
    },
    extraReducers:(builder)=>{

        //LOGIN Part
        builder.addCase(loginFunction.pending, (state)=>{
            state.isLoading=true;
        });
        builder.addCase(loginFunction.fulfilled, (state,action)=>{
            state.isLogged=true;
            state.error="";
            state.isLoading=false;
            state.userID=action.payload;
        });
        builder.addCase(loginFunction.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLogged=false;
            state.isLoading=false;
            state.userID="";
        });

        //SIGNUP Part
        builder.addCase(signupFunction.pending,(state)=>{
            state.isLoading=true;
        }).addCase(signupFunction.fulfilled,(state,action)=>{
            state.isLogged=true;
            state.error="";
            state.isLoading=false;
            state.userID=action.payload;
        }).addCase(signupFunction.rejected,(state,action)=>{
            state.error=action.payload;
            state.isLogged=false;
            state.isLoading=false;
            state.userID="";
        })

        //LOGOUT Part
        builder.addCase(logout.pending, (state)=>{
            state.isLoading=true;
        }).addCase(logout.fulfilled, (state)=>{
            state.isLogged=false;
            state.error="";
            state.isLoading=false;
            state.userID="";
        }).addCase(logout.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLoading=false;
        })
    }
})
export const {removeError, sessionPresent, authenticate}=loginSlice.actions;
export default loginSlice.reducer;