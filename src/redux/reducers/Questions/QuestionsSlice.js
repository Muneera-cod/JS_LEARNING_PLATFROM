import { createSlice } from "@reduxjs/toolkit";
const initialState = { items:[] , loading:false , error:null}
const questionsSlice=createSlice({
    name:'questions',
    initialState
})