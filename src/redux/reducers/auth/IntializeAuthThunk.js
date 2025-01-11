import { onAuthStateChanged } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../../utils/config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export const initializeAuth = createAsyncThunk('auth/initializeAuth', async (_, thunkAPI) => {
    try {
        const user = await new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject(new Error('User is signed Out'));
                }
            });
        });

        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                return { email:user.email,displayName:user.displayName,role:userData.role }; // Return user object with role
            } else {
                throw new Error('User document does not exist.');
            }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});