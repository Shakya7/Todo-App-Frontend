import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const profileState={
    isFetching:false,
    isNameUpdating:false,
    isEmailUpdating:false,
    isMobileUpdating:false,
    isPasswordUpdating:false,
    id:"",
    error:{
        updateName:"",
        updateEmail:"",
        updateMobile:"",
        fetchData:"",
        updatePassword:"",

    },
    name:"",
    email:"",
    mobile:"",

    updateEmailOverlay:false,
    updateMobileOverlay:false,
    updatePasswordFlag:false,
    forgotPassword:{
        isLoading:false,
        error:"",
        success:""
    },
    resetPassword:{
        isLoading:false,
        error:"",
        success:""
    }
}

export const fetchAccountData=createAsyncThunk("/profile/fetchAccountData",async(profileID,{rejectWithValue})=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getProfileData/${profileID}`);
        return data.data.data.user;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updateName=createAsyncThunk("/profile/updateName", async(obj,{rejectWithValue})=>{
    try{
        const data=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updateName/${obj.profileID}`,{
            name:obj.name
        })
        return data.data.data.user;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updateEmail=createAsyncThunk("/profile/updateEmail",async (obj,{rejectWithValue})=>{
    try{    
        console.log("Hello ",obj.profileID);
        const data=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updateMail/${obj.profileID}`,{
            email:obj.email,
            password:obj.passwordForEmail,
        })
        return data.data.data.user;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updateMobile=createAsyncThunk("/profile/updateMobile",async (obj,{rejectWithValue})=>{
    try{    
        
        const data=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updateMobile/${obj.profileID}`,{
            mobile:obj.mobile,
            password:obj.passwordForMobile
        })
        return data.data.data.user;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updatePassword=createAsyncThunk("/profile/updatePassword", async(obj,{rejectWithValue})=>{
    try{
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updatePassword/${obj.profileID}`,{
            password:obj.password,
            currentPassword:obj.currentPassword
        })
        
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const sendPasswordLinkToEmail=createAsyncThunk("profile/sendPasswordLinkToEmail", async(obj,{rejectWithValue})=>{
    try{
        console.log(obj);
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/forgotPassword`,{
            email:obj.email
        })
        
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const resetPassword=createAsyncThunk("profile/resetPassword",async(obj,{rejectWithValue})=>{
    try{
        //console.log(obj.newPassword);
        const user=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/resetPassword/${obj.token}`,{
            password:obj.password,
            confirmPassword:obj.confirmPassword
        },{withCredentials:true});
        //console.log(user);

    }catch(err){
        //console.log(err);
        return rejectWithValue(err.message);
    }
})

const profileSlice=createSlice({
    name:"profile",
    initialState:profileState,
    reducers:{
        resetData:(state)=>{
            state.isFetching=false;
            state.isNameUpdating=false;
            state.isEmailUpdating=false;
            state.isMobileUpdating=false;
            state.id="";
            state.error={
                updateEmail:"",
                updateMobile:"",
                fetchData:"",
                updateName:""
            };
            state.name="";
            state.email="";
            state.mobile="";
        },
        setUpdateEmailOverlay:(state,action)=>{
            if(action.payload===false)
                state.error.updateEmail=""
            state.updateEmailOverlay=action.payload;
        },
        setUpdateMobileOverlay:(state,action)=>{
            if(action.payload===false)
                state.error.updateMobile=""
            state.updateMobileOverlay=action.payload;
        },
        setUpdatePasswordFlag:(state,action)=>{
            if(action.payload===false)
                state.error.updatePassword=""
            state.updatePasswordFlag=action.payload;
        },
        clearPasswordError:(state)=>{
            state.error.updatePassword=""
        }

    },
    extraReducers:(builder)=>{

        //fetch account data
        builder.addCase(fetchAccountData.pending,(state)=>{
            state.isFetching=true;
        })
        builder.addCase(fetchAccountData.fulfilled,(state,action)=>{
            state.id=action.payload._id;
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.mobile=action.payload.mobile_number;
            state.isFetching=false;
            state.error.fetchData="";
        })
        builder.addCase(fetchAccountData.rejected,(state,action)=>{
            state.error.fetchData="Error in fetching data!!!";
            state.isFetching=false;
        })

        //Update name
        builder.addCase(updateName.pending,(state)=>{
            state.isNameUpdating=true;
        }).addCase(updateName.fulfilled,(state,action)=>{
            state.name=action.payload.name;
            state.isNameUpdating=false;
            state.error.updateName=""
        }).addCase(updateName.rejected,(state, action)=>{
            state.error.updateName="Network issue!!!";
            state.isNameUpdating=false;
        })

        //Update email
        builder.addCase(updateEmail.pending, (state)=>{
            state.isEmailUpdating=true;
        }).addCase(updateEmail.fulfilled, (state,action)=>{
            state.email=action.payload.email;
            state.isEmailUpdating=false;
            state.error.updateEmail="";
            state.updateEmailOverlay=false;
        }).addCase(updateEmail.rejected, (state)=>{
            state.error.updateEmail="Inavalid password or email or network issue!!!";
            state.isEmailUpdating=false;
            state.updateEmailOverlay=true;
        })

        //Update mobile
        builder.addCase(updateMobile.pending,(state)=>{
            state.isMobileUpdating=true;
        }).addCase(updateMobile.fulfilled, (state,action)=>{

            state.mobile=action.payload.mobile_number;
            state.isMobileUpdating=false;
            state.error.updateMobile="";
            state.updateMobileOverlay=false;
        }).addCase(updateMobile.rejected,(state)=>{
            state.error.updateMobile="Inavalid password or mobile or network issue!!!";
            state.isMobileUpdating=false;
            state.updateMobileOverlay=true;
        })

        //Update password
        builder.addCase(updatePassword.pending,(state)=>{
            state.isPasswordUpdating=true;
        }).addCase(updatePassword.fulfilled,(state)=>{
            state.error.updatePassword="";
            state.isPasswordUpdating=false;
            state.updatePasswordFlag=false;
        }).addCase(updatePassword.rejected, (state,action)=>{
            console.log(action.payload);
            state.error.updatePassword=action.payload==="Invalid credentials. Please check the email and password."?"Invalid credentials. Please check old password.":action.payload;
            state.isPasswordUpdating=false;
            state.updatePasswordFlag=true;
        })

        //Forgot password
        builder.addCase(sendPasswordLinkToEmail.pending,(state)=>{
            state.forgotPassword.isLoading=true;
        }).addCase(sendPasswordLinkToEmail.fulfilled, (state)=>{
            state.forgotPassword.isLoading=false;
            state.forgotPassword.error="";
            state.forgotPassword.success="Password reset link has been sent to your email address."
        }).addCase(sendPasswordLinkToEmail.rejected, (state,action)=>{
            state.forgotPassword.isLoading=false;
            state.forgotPassword.error=action.payload;
            state.forgotPassword.success="";
        })

        //Reset password
        builder.addCase(resetPassword.pending, (state)=>{
            state.resetPassword.isLoading=true;
        }).addCase(resetPassword.fulfilled, (state)=>{
            state.resetPassword.isLoading=false;
            state.resetPassword.error="";
            state.resetPassword.success="Password has been changed. Please login now"
        }).addCase(resetPassword.rejected,(state,action)=>{
            state.resetPassword.isLoading=false;
            state.resetPassword.error=action.payload;
            state.resetPassword.success="";
        })
    }
})

export const {resetData, setUpdateEmailOverlay, setUpdateMobileOverlay,setUpdatePasswordFlag, clearPasswordError}=profileSlice.actions;
export default profileSlice.reducer;