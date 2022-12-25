import { createSlice } from "@reduxjs/toolkit";

const filterState={
    filter:"all",
    sort:"",
    second_filter:"",
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
        resetFilter:(state)=>{
            state.second_filter="";
            state.filteredTodos=[];
        },
        filterTodosOnLowPr:(state,action)=>{
            state.second_filter="low-priority";
            state.filteredTodos=action.payload.filter((todo)=>todo.priority==="Low");
            
        },
        filterTodosOnHighPr:(state,action)=>{
            state.second_filter="high-priority";
            state.filteredTodos=action.payload.filter((todo)=>todo.priority==="High");
        },
        filterTodosOn5Ageing:(state,action)=>{
            state.second_filter="ageing >= 5";
            let now=new Date();

            /*Formula to find out the total number of days passed (total ms --> total days) from the time of creation of todos*/

            //(Math.abs(todo.createDate.getTime() - now.getTime()))/ (24 * 60 * 60 * 1000);

            state.filteredTodos=action.payload.filter((todo)=>((Math.abs(new Date(todo.createDate).getTime() - now.getTime()))/ (24 * 60 * 60 * 1000))>=5);
        }
    }
})

export const {setInProgress, setCompleted, setAll, filterTodosOnLowPr, filterTodosOnHighPr, filterTodosOn5Ageing, resetFilter}=filterTodoSlice.actions;
export default filterTodoSlice.reducer;