import { createSlice } from "@reduxjs/toolkit";

const filterState={
    filter:"all",
    filteredTodos:[]
}

const filterTodoSlice=createSlice({
    name:"filterTodo",
    initialState:filterState,
    reducers:{
        setInProgress:(state)=>{
            state.filter="inProgress"
        },
        setCompleted:(state)=>{
            state.filter="completed"
        },
        setAll:(state)=>{
            state.filter="all"
        },
        setLowPriority:(state)=>{
            state.filter="lowPr"
        },
        setHighPriority:(state)=>{
            state.filter="highPr"
        }
    }
})

export const {setInProgress, setCompleted, setAll}=filterTodoSlice.actions;
export default filterTodoSlice.reducer;