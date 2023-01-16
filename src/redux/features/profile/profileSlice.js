import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { account } from "../../../appwrite/appwriteConfig";


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
        updatePassword:""

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
    }

}

export const fetchAccountData=createAsyncThunk("/profile/fetchAccountData",async(_,{rejectWithValue})=>{
    try{
        const data=await account.get();
        //console.log(data);
        return data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updateName=createAsyncThunk("/profile/updateName", async({name},{rejectWithValue})=>{
    try{
        const data=await account.updateName(name);
        return data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updateEmail=createAsyncThunk("/profile/updateEmail",async ([password, email],{rejectWithValue})=>{
    try{    
        const data=account.updateEmail(email, password);
        return data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updateMobile=createAsyncThunk("/profile/updateMobile",async ([password,mobile],{rejectWithValue})=>{
    try{    
        //console.log(mobile,password);
        const data=account.updatePhone(`+91${mobile}`, password);
        return data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updatePassword=createAsyncThunk("/profile/updatePassword", async(obj,{rejectWithValue})=>{
    try{
        await account.updatePassword(obj.new_p,obj.old_p)
    }catch(err){
        return rejectWithValue(err.message);
    }
})


export const sendPasswordLinkToEmail=createAsyncThunk("profile/sendPasswordLinkToEmail", async(obj,{rejectWithValue})=>{
    try{
        console.log(obj);

        account.createRecovery(obj.email, obj.redirectLink).then((response)=>{
            console.log(response);
        }).catch((err)=>{console.log(err)});
    }catch(err){
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
            state.id=action.payload.$id;
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.mobile=action.payload.phone;
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
            state.error.updateEmail="Inavalid password or network issue!!!";
            state.isEmailUpdating=false;
            state.updateEmailOverlay=true;
        })

        //Update mobile
        builder.addCase(updateMobile.pending,(state)=>{
            state.isMobileUpdating=true;
        }).addCase(updateMobile.fulfilled, (state,action)=>{
            state.mobile=action.payload.phone;
            state.isMobileUpdating=false;
            state.error.updateMobile="";
            state.updateMobileOverlay=false;
        }).addCase(updateMobile.rejected,(state)=>{
            state.error.updateMobile="Inavalid password or network issue!!!";
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
    }
})

export const {resetData, setUpdateEmailOverlay, setUpdateMobileOverlay,setUpdatePasswordFlag, clearPasswordError}=profileSlice.actions;
export default profileSlice.reducer;