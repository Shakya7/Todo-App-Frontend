import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/loginSlice";
import profileReducer from "./features/profile/profileSlice";
import todoReducer from "./features/todos/todoSlice";
import updateTodoReducer from "./features/updateTodos/updateTodoSlice";
import filterTodoRecucer from "./features/filter/filterTodosSlice";
import eventReducer from "./features/calendar/eventSlice";
import noteReducer from "./features/note/noteSlice";
import settingsReducer from "./features/settings/settingSlice";
import searchReducer from "./features/search/searchSlice";


export const store=configureStore({
    reducer:{
        login:loginReducer,
        profile:profileReducer,
        todo:todoReducer,
        updateTodo:updateTodoReducer,
        filterTodo:filterTodoRecucer,
        event:eventReducer,
        note:noteReducer,
        settings:settingsReducer,
        search:searchReducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({
            serializableCheck: {
              // Ignore these action types
              
              ignoredActions: ['updateTodo/loadDataIntoRedux', 'note/loadUpdateNote'],
            },
        })
    }
    
})