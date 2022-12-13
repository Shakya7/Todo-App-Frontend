import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const todoState={
    isFetchingTodos:false,
    todos:[],
    error:""
}
export const fetchTodos=createAsyncThunk("/todo/fetchTodos",async(_,{rejectWithValue})=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getAllTodos`);
        return data.data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

const todoSlice=createSlice({
    name:"todo",
    initialState:todoState,
    extraReducers: (builder)=>{
        builder.addCase(fetchTodos.pending,(state)=>{
            state.isFetchingTodos=true;
        })
        builder.addCase(fetchTodos.fulfilled,(state,action)=>{
            state.todos=action.payload.data.todos;
            state.isFetchingTodos=false;
        })
        builder.addCase(fetchTodos.rejected, (state,action)=>{
            state.error=action.payload;
            state.isFetchingTodos=false;
        })
    }
})

export default todoSlice.reducer;