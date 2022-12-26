import { createSlice } from "@reduxjs/toolkit";

const filterState={
    filter:"all",
    sort:"",
    second_filter:"",
    filteredTodos:[],
    sortedTodos:[]
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
        setAll:(state,action)=>{
            state.filter="all";
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
        },
        sortByUpdatedDateOldest:(state,action)=>{
            const updatedSortedTodos=[...action.payload];
            state.sort="updated-date-oldest";
            state.sortedTodos=updatedSortedTodos.sort((a,b)=>new Date(a.updatedDate)-new Date(b.updatedDate));
        },
        sortByUpdatedDateLatest:(state,action)=>{
            const updatedSortedTodos=[...action.payload];
            state.sort="updated-date-latest";
            state.sortedTodos=updatedSortedTodos.sort((a,b)=>new Date(b.updatedDate)-new Date(a.updatedDate));
        },
        sortByCreatedDateOldest:(state, action)=>{
            const updatedSortedTodos=[...action.payload];
            state.sort="created-date-oldest";
            state.sortedTodos=updatedSortedTodos.sort((a,b)=>new Date(a.createDate)-new Date(b.createDate));
        },
        sortByCreatedDateLatest:(state, action)=>{
            const updatedSortedTodos=[...action.payload];
            state.sort="created-date-latest";
            state.sortedTodos=updatedSortedTodos.sort((a,b)=>new Date(b.createDate)-new Date(a.createDate))
        },
        resetSort:(state)=>{
            state.sort="";
            state.sortedTodos=[];
        }
    }
})

export const {setInProgress, setCompleted, setAll, filterTodosOnLowPr, filterTodosOnHighPr, filterTodosOn5Ageing, resetFilter, sortByUpdatedDateOldest, sortByUpdatedDateLatest, sortByCreatedDateOldest, sortByCreatedDateLatest, resetSort}=filterTodoSlice.actions;
export default filterTodoSlice.reducer;