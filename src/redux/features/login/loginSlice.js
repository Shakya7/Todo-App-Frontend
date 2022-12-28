import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { account } from "../../../appwrite/appwriteConfig";
import {ID} from "appwrite";

const loginState={
    isLoading:false,
    isLogged:false,
    error:"",
}
export const signupFunction=createAsyncThunk("/login/signupFunction",async({email,password,name},{rejectWithValue})=>{
    try{
        await account.create(ID.unique(), email, password, name);
        //console.log(data);
        const data=await account.createEmailSession(email, password);
        return data;
    }catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue(err.message);
    }
})

export const loginFunction=createAsyncThunk("/login/loginFunction",async({email,password},{rejectWithValue})=>{
    try{
        const data=await account.createEmailSession(email, password);
        return data;
    }catch(err){
        
        //****** in REDUX-THUNK error handling, rejectwithValue is used as used *//
        return rejectWithValue(err.message);
    }
})

export const logout=createAsyncThunk("/login/logout",async(_,{rejectWithValue})=>{
    try{
        await account.deleteSession("current");
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
        });
        builder.addCase(loginFunction.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLogged=false;
            state.isLoading=false;
        });

        //SIGNUP Part
        builder.addCase(signupFunction.pending,(state)=>{
            state.isLoading=true;
        }).addCase(signupFunction.fulfilled,(state)=>{
            state.isLogged=true;
            state.error="";
            state.isLoading=false;
        }).addCase(signupFunction.rejected,(state,action)=>{
            state.error=action.payload;
            state.isLogged=false;
            state.isLoading=false;
        })

        //LOGOUT Part
        builder.addCase(logout.pending, (state)=>{
            state.isLoading=true;
        }).addCase(logout.fulfilled, (state)=>{
            state.isLogged=false;
            state.error="";
            state.isLoading=false;
        }).addCase(logout.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLoading=false;
        })
    }
})
export const {removeError, sessionPresent}=loginSlice.actions;
export default loginSlice.reducer;