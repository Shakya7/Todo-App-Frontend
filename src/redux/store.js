import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/loginSlice";
import profileReducer from "./features/profile/profileSlice";
import todoReducer from "./features/todos/todoSlice";


export const store=configureStore({
    reducer:{
        login:loginReducer,
        profile:profileReducer,
        todo:todoReducer
    }
})