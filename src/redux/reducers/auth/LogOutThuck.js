import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/config/firebaseConfig";
import { persistor } from "../../store/store";
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await signOut(auth);
        await persistor.purge();
        return {email:'',displayName:'',role:''};
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
})