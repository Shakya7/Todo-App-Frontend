import { createSlice } from "@reduxjs/toolkit";


const selectedTodoState={
    title: "",
    priority:"",
    tasks:[],
    id:"",
}

const updateTodoSlice=createSlice({
    name:"updateTodo",
    initialState:selectedTodoState,
    reducers:{
        loadDataIntoRedux:(state,action)=>{
            state.title=action.payload.title;
            state.priority=action.payload.priority;
            state.tasks=action.payload.tasks;
            state.id=action.payload.id;
        },
        updateTitleAndPriority:(state,action)=>{
            state.title=action.payload.title;
            state.priority=action.payload.priority;
        },
        addTasks:(state,action)=>{
            state.tasks=action.payload.tasks;
        }

    },
});

export const {loadDataIntoRedux, updateTitleAndPriority, addTasks}=updateTodoSlice.actions;
export default updateTodoSlice.reducer;