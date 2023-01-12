import { createSlice } from "@reduxjs/toolkit";

const searchState={
    todos:[],
    notes:[],
}


const searchSlice=createSlice({
    name:"search",
    initialState:searchState,
    reducers:{
        setSearchedTodos:(state,action)=>{
            state.todos=[];
            state.todos=action.payload;
        },
        setSearchedNotes:(state, action)=>{
            state.notes=[];
            state.notes=action.payload;
        }
    }
});

export const {setSearchedTodos, setSearchedNotes}=searchSlice.actions;
export default searchSlice.reducer;