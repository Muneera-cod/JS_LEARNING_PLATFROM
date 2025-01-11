import { createSlice } from "@reduxjs/toolkit";
const initialState={curView:0,curSubView:0}
const viewSlice=createSlice({
    name:'view',
    initialState,
    reducers:{
        setView:(state,action)=>{
            state.curView = action.payload
        },
        setSubView:(state,action)=>{
            state.curSubView = action.payload
        }
    }
})
export const {setView,setSubView}=viewSlice.actions
export default viewSlice.reducer