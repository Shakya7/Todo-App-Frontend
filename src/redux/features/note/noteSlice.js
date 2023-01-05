import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const noteState={
    isLoading:false,
    error:"",
    notes:[],
    updateNote:{
        id:"",
        title:"",
        color:"",
        note:"",
        uDate:"",
        cDate:""
    }
}

export const loadNotes=createAsyncThunk("note/loadNotes",async(id,{rejectWithValue})=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notes/getAllNotes/${id}`);
        return data.data.data.notes;
    }catch(err){
        return rejectWithValue(err.message);
    }
});

export const createNote=createAsyncThunk("note/createNote",async(object,{rejectWithValue})=>{
    try{
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notes/createNote`,{
            title:object.title,
            note:object.note,
            color:object.color,
            userID:object.profileID,
            createdDate: new Date(Date.now()),
            updatedDate:new Date(Date.now())
        });
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notes/getAllNotes/${object.profileID}`);
        return data.data.data.notes;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const updateNote=createAsyncThunk("note/updateNote",async(object,{rejectWithValue})=>{
    try{
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notes/updateNote/${object.noteID}`,{
            title:object.title,
            note:object.note,
            updatedDate:new Date(Date.now()),
            color:object.color
        });
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notes/getAllNotes/${object.profileID}`);
        return data.data.data.notes;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const deleteNote=createAsyncThunk("note/deleteNote",async(object,{rejectWithValue})=>{
    try{
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notes/deleteNote/${object.noteID}`);
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notes/getAllNotes/${object.profileID}`);
        return data.data.data.notes;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

const noteSlice=createSlice({
    name:"note",
    initialState:noteState,
    reducers:{
        loadUpdateNote:(state,action)=>{
            state.updateNote.id=action.payload.id;
            state.updateNote.title=action.payload.title;
            state.updateNote.color=action.payload.color;
            state.updateNote.note=action.payload.noteContent;
            state.updateNote.cDate=action.payload.cdate;
            state.updateNote.uDate=action.payload.udate;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loadNotes.pending,(state)=>{
            state.isLoading=true;
        }).addCase(loadNotes.fulfilled, (state,action)=>{
            state.notes=action.payload;
            state.isLoading=false;
            state.error="";
        }).addCase(loadNotes.rejected, (state,action)=>{
            //state.events=[];
            state.error=action.payload;
            state.isLoading=false;
        })

        builder.addCase(createNote.pending, (state)=>{
            state.isLoading=true;
        }).addCase(createNote.fulfilled, (state,action)=>{
            state.notes=action.payload;
            state.error="";
            state.isLoading=false;
        }).addCase(createNote.rejected, (state,action)=>{
            //state.events=[];
            state.error=action.payload;
            state.isLoading=false;
        });

        builder.addCase(updateNote.pending, (state)=>{
            state.isLoading=true;
        }).addCase(updateNote.fulfilled, (state,action)=>{
            state.notes=action.payload;
            state.error="";
            state.isLoading=false;
        }).addCase(updateNote.rejected, (state,action)=>{
            //state.events=[];
            state.error=action.payload;
            state.isLoading=false;
        });

        builder.addCase(deleteNote.pending, (state)=>{
            state.isLoading=true;
        }).addCase(deleteNote.fulfilled, (state,action)=>{
            state.notes=action.payload;
            state.error="";
            state.isLoading=false;
        }).addCase(deleteNote.rejected, (state,action)=>{
            //state.events=[];
            state.error=action.payload;
            state.isLoading=false;
        });
    }
})

export const {loadUpdateNote}=noteSlice.actions;
export default noteSlice.reducer;