import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice.js"


const store=configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store;