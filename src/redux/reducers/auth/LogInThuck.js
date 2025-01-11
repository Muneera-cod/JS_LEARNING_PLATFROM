import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth ,db} from "../../../utils/config/firebaseConfig";
import {getDoc,doc} from 'firebase/firestore'

export const login = createAsyncThunk('auth/login', async ({email,password}, thunkAPI) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return { email:user.email , displayName:user.displayName , role:userData.role};
        }
        else{
            return thunkAPI.rejectWithValue({ error: 'User not found' });
        }
    } 
    catch (error) {
        console.log('error',error)
       
        return thunkAPI.rejectWithValue({ error: error.message });
    }
})