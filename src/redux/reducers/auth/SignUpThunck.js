import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { setDoc, collection,doc } from "firebase/firestore";
import { auth, db } from "../../../utils/config/firebaseConfig";
export const signUp = createAsyncThunk('auth/signUp', async ({email,password,displayName}, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: displayName
    });
    const userRef = collection(db, 'users');
    await setDoc( doc(userRef, user.uid),  {
      email: user.email,
      displayName: user.displayName,
      role:'learner'
    });
    return {  email:user.email , displayName:user.displayName,role:'learner'};
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
})