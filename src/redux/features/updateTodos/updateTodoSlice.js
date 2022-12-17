import { createSlice } from "@reduxjs/toolkit";


const selectedTodoState={
    title: "",
    priority:"",
    tasks:[],
    id:""
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
        }

    },
});

export const {loadDataIntoRedux, updateTitleAndPriority}=updateTodoSlice.actions;
export default updateTodoSlice.reducer;