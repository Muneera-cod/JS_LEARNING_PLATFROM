import { createSlice } from "@reduxjs/toolkit";
const initialState={ isDarkmode: JSON.parse(localStorage.getItem('isDarkmode') ?? "false") }
const themeSlice=createSlice({
    name:'theme',
    initialState,
    reducers: {
       toggleMode: (state)=>{
        state.isDarkmode=!state.isDarkmode
        localStorage.setItem('isDarkmode', JSON.stringify(state.isDarkmode));

       }
    }
})
export const {toggleMode} = themeSlice.actions;
export default themeSlice.reducer