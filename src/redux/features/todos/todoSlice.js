import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const todoState={
    isFetchingTodos:false,
    todos:[],
    error:"",
    filteredTodos:[]
}
export const fetchTodos=createAsyncThunk("/todo/fetchTodos",async(id,{rejectWithValue})=>{
    try{
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getAllTodos/${id}`);
        return data.data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const deleteTodo=createAsyncThunk("/todo/deleteTodo",async(object,{rejectWithValue})=>{
    try{
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/deleteTodo/${object.todoID}`);
        const data=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/todos/getAllTodos/${object.profileID}`);
        return data.data;
    }catch(err){
        return rejectWithValue(err.message);
    }
})

function inProgressTodos(todos){
    const updatedTodos=[];
    for(let i=0;i<todos.length;i++){
        if(todos[i].tasks.length!==0){
            for(let j=0;j<todos[i].tasks.length;j++){
                if(todos[i].tasks[j].inProgress===true){
                    updatedTodos.push(todos[i]);
                    break;
                }
            }
        }
        else
            updatedTodos.push(todos[i]);
    }
    return updatedTodos;
}

function completedTodos(todos){
    const updatedTodos=[];
    for(let i=0;i<todos.length;i++){
        let flag=true;
        if(todos[i].tasks.length!==0){
            for(let j=0;j<todos[i].tasks.length;j++){
                if(todos[i].tasks[j].inProgress===false){
                    flag=true;
                    continue;
                }
                else{
                    flag=false
                    break;
                }
                    
            }
            if(flag)
                updatedTodos.push(todos[i]);
        }

    }
    return updatedTodos;
}


const todoSlice=createSlice({
    name:"todo",
    initialState:todoState,
    reducers:{
        loadInProgressTodos:(state,action)=>{
            //console.log(action.payload);
            state.filteredTodos=inProgressTodos(action.payload);

        },
        loadCompletedTodos:(state, action)=>{
            state.filteredTodos=completedTodos(action.payload);
        },

        resetTodosData:(state)=>{
            state.isFetchingTodos=false;
            state.todos=[];
            state.error="";
            state.filteredTodos=[];
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchTodos.pending,(state)=>{
            state.isFetchingTodos=true;
        })
        builder.addCase(fetchTodos.fulfilled,(state,action)=>{
            state.todos=action.payload.data.todos;
            state.error="";
            state.isFetchingTodos=false;
        })
        builder.addCase(fetchTodos.rejected, (state,action)=>{
            state.error=action.payload;
            state.todos=[];
            state.isFetchingTodos=false;
        })

        builder.addCase(deleteTodo.pending,(state)=>{
            state.isFetchingTodos=true;
        })
        builder.addCase(deleteTodo.fulfilled, (state,action)=>{
            state.todos=action.payload.data.todos;
            state.error="";
            state.isFetchingTodos=false;
        })
        builder.addCase(deleteTodo.rejected,(state,action)=>{
            state.error=action.payload;
            state.todos=[];
            state.isFetchingTodos=false;
        })
    }
})

export const {loadInProgressTodos, loadCompletedTodos, resetTodosData}=todoSlice.actions;
export default todoSlice.reducer;