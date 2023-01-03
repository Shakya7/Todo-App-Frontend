import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const eventState={
    isLoading:false,
    events:[],
    error:"",
    updateEvent:{
        title:"",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time:"",
        link:"",
        id:""
    }
}

export const loadEvents=createAsyncThunk("event/loadEvents",async(id,{rejectWithValue})=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events/getAllEvents/${id}`);
        return data.data.events;
    }catch(err){
        return rejectWithValue(err.message);
    }
});

export const updateEvent=createAsyncThunk("event/updateEvent",async(object,{rejectWithValue})=>{
    try{
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events/updateEvent/${object.eventID}`,{
            title:object.title,
            start:new Date(`${object.start_date}T${object.start_time}:00.000Z`),
            end:new Date(`${object.end_date}T${object.end_time}:00.00Z`),
            link:object.link
        });

        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events/getAllEvents/${object.profileID}`);
        return data.data.events;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const createEvent=createAsyncThunk("event/createEvent",async(object,{rejectWithValue})=>{
    try{
        //console.log(object);
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events/createEvent/${object.profileID}`,{
            title:object.title,
            start:new Date(`${object.start_date}T${object.start_time}:00.000Z`),
            end:new Date(`${object.end_date}T${object.end_time}:00.00Z`),
            link:object.link,
            userID:object.profileID
        });
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events/getAllEvents/${object.profileID}`);
        return data.data.events;
        //return data.data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const deleteEvent=createAsyncThunk("event/deleteEvent",async(object,{rejectWithValue})=>{
    try{
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events/deleteEvent/${object.eventID}`);
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events/getAllEvents/${object.profileID}`);
        return data.data.events;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

const eventSlice=createSlice({
    name:"event",
    initialState:eventState,
    reducers:{
        loadEventData:(state,action)=>{
            //console.log(typeof action.payload.start);
            let start_dt=action.payload.start.split("T");
            let end_dt=action.payload.end.split("T");

            state.updateEvent.title=action.payload.title;
            state.updateEvent.link=action.payload.link;
            state.updateEvent.start_date=start_dt[0];
            state.updateEvent.start_time=start_dt[1].slice(0,5);
            state.updateEvent.end_date=end_dt[0];
            state.updateEvent.end_time=end_dt[1].slice(0,5);
            state.updateEvent.id=action.payload._id;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loadEvents.pending,(state)=>{
            state.isLoading=true;
        }).addCase(loadEvents.fulfilled, (state,action)=>{
            state.events=action.payload;
            state.isLoading=false;
            state.error="";
        }).addCase(loadEvents.rejected, (state,action)=>{
            state.events=[];
            state.error=action.payload;
            state.isLoading=false;
        })

        builder.addCase(updateEvent.pending, (state)=>{
            state.isLoading=true;
        }).addCase(updateEvent.fulfilled, (state,action)=>{
            state.events=action.payload;
            state.isLoading=false;
            state.error="";
        }).addCase(updateEvent.rejected, (state,action)=>{
            //state.events=[];
            state.error=action.payload;
            state.isLoading=false;
        });

        builder.addCase(createEvent.pending, (state)=>{
            state.isLoading=true;
        }).addCase(createEvent.fulfilled, (state,action)=>{
            state.events=action.payload;
            state.error="";
            state.isLoading=false;
        }).addCase(createEvent.rejected, (state,action)=>{
            //state.events=[];
            state.error=action.payload;
            state.isLoading=false;
        });

        builder.addCase(deleteEvent.pending, (state)=>{
            state.isLoading=true;
        }).addCase(deleteEvent.fulfilled, (state,action)=>{
            state.events=action.payload;
            state.error="";
            state.isLoading=false;
        }).addCase(deleteEvent.rejected, (state,action)=>{
            state.error=action.payload;
            state.isLoading=false;
        })
    }
});

export const {loadEventData}=eventSlice.actions;
export default eventSlice.reducer;