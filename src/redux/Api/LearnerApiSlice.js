import { fakeBaseQuery,createApi } from "@reduxjs/toolkit/query/react";
import { db } from "../../utils/config/firebaseConfig";
import { where, collection, getDocs, doc, getDoc, query, setDoc ,serverTimestamp } from "firebase/firestore";
 export const learnerApi = createApi({
    reducerPath: 'learnerApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Learner'],
    endpoints : (builder) => ({
        fetchLearners: builder.query({
         queryFn: async () => {
             try{
                const learnersQuery = query(collection(db, 'users'), where('role', '==', 'learner'));
                const querySnapshot = await getDocs(learnersQuery);
                const learnersData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                return {data: learnersData}

             }
                catch(error){
                    return {error: {message: error.message}}
                }
         }
        }),
        fetchLearner: builder.query({
            queryFn: async (learnerId) => {
                try{
                    const learner = await getDoc(doc(db,'users',learnerId))
                    return {data: learner.data()}
                }
                catch(error){
                    return {error: {message: error.message}}
                }
            }
        }), 
        addLearner: builder.mutation({
            queryFn: async (learner) => {
                try {
                    if (!learner.email || !learner.password || !learner.displayName) {
                        throw new Error('Email, password, and displayName are required.');
                    }

                    // Send request to the backend server for user creation
                    const response = await fetch('http://localhost:5000/create-learner', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: learner.email,
                            password: learner.password,
                            displayName: learner.displayName,
                            createdAt: serverTimestamp() 
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to create learner');
                    }

                    const data = await response.json();
                    await setDoc(doc(db, 'users', data.uid), {
                        email: learner.email,
                        displayName: learner.displayName,
                        role: 'learner',
                        createdAt: serverTimestamp()
                    });
                    return { data };
                } catch (error) {
                    return { error: { message: error.message } };
                }


            },
            invalidatesTags: ['Learner']
        }),
        updateLearner: builder.mutation({
            queryFn: async (learner) => {
                try{
                    const learnerRef = doc(db,'users',learner.id)
                    const learnerDoc = await setDoc(learnerRef,{
                        email: learner.email,
                        displayName: learner.displayName,
                        role: 'learner'
                    },{ merge : true })
                    return {data: learnerDoc}
                }
                catch(error){
                    return {error: {message: error.message}}
                }
            },
            invalidatesTags: ['Learner']
        }),
        deleteLearner: builder.mutation({
            queryFn: async (learnerId) => {
                try {
                    // Send request to the backend server for user deletion
                    const response = await fetch(`http://localhost:5000/delete-learner/${learnerId}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete learner');
                    }

                    return { data: learnerId };
                } catch (error) {
                    return { error: { message: error.message } };
                }
            },
            invalidatesTags: ['Learner']
        })
    })
 })
 export const { useFetchLearnersQuery,useFetchLearnerQuery,useAddLearnerMutation,useUpdateLearnerMutation,useDeleteLearnerMutation   } = learnerApi
