import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateProfile, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/config/firebaseConfig';
import { setDoc, collection, doc, getDoc,serverTimestamp } from 'firebase/firestore';
import { db } from '../../utils/config/firebaseConfig';
import '@mantine/notifications/styles.css';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      queryFn: async ({ email, password, displayName }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          await updateProfile(user, { displayName });
          const userRef = collection(db, 'users');
          await setDoc(doc(userRef, user.uid), {
            email: user.email,
            displayName: user.displayName,
            role: 'learner',
            createdAt: serverTimestamp() 
          });
          return { data: { ...user, role: 'learner' } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          return { data: { ...user, role: userData.role } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: 'Logged out successfully' };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Auth'],
    }),
    checkAuth: builder.query({
      queryFn: async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();
            return { data: { ...user, role: userData.role } };
          } else {
            return { data: null };
          }
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: ['Auth'],
    }),
    updateProfile: builder.mutation({
      queryFn: async ( data ) => {
        try {
          const user = auth.currentUser;
          if (!user) {
            throw new Error('No authenticated user found');
          }
          await updateProfile(user, data);
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, data, { merge: true });
          return { data: 'Profile updated successfully' };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Auth'],
    }),
    // updateEmail: builder.mutation({
    //   queryFn: async ({ newEmail , currentPassword }) => {
    //     try {
    //       const user = auth.currentUser;
    //       if (!user) {
    //         throw new Error('No authenticated user found');
    //       }
          
    //        // Step 1: Prepare credentials for re-authentication
    //        const credential = EmailAuthProvider.credential(user.email, currentPassword);
    //        await reauthenticateWithCredential(user, credential);
   
    //        // Update the email
    //        await updateEmail(user, newEmail);
   
    //        // Send email verification after updating
    //        await sendEmailVerification(user);
    
    //       // Update the email in Firestore
    //       const userRef = doc(db, 'users', user.uid);
    //       await updateDoc(userRef, { email: newEmail });
    
    //       return { data: 'Email updated successfully' };
    //     } catch (error) {
    //       return { error: { message: error.message } };
    //     }
    //   },
    //   invalidatesTags: ['Auth'],
    // }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation, useCheckAuthQuery , useUpdateProfileMutation  } = authApi;