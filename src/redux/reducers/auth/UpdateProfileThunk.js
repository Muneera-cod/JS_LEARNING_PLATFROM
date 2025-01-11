import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfile } from "firebase/auth";
export const updateProfileThunk = createAsyncThunk('auth/updateProfile', async ({user,data}, thunkAPI) => {
    try {
        await updateProfile(user, data);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
})