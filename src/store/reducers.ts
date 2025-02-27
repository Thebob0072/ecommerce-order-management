"use client";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    // เพิ่ม reducers อื่น ๆ ที่นี่
});

export default rootReducer;
