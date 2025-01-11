import { createApi,fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {  doc, getDocs, setDoc ,collection ,getDoc } from "firebase/firestore";
import { db } from "../../utils/config/firebaseConfig";
export const userProgressApi = createApi({
    reducerPath: 'userProgressApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['UserProgress'],
    endpoints: (builder)=>({
        fetchUserProgress: builder.query({
            queryFn: async (uid) =>{
            try{
                 const subcollectionRef = collection( db , 'userProgress' , uid , 'progressEntries')
                 const querySnapshot = await getDocs(subcollectionRef) 
                 if (!querySnapshot.empty) {
                    const progressData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    return { data: progressData };
                } else {
                    return { data: [] }; // Return empty array if no data found
                }
             }
             catch(error){
                return { data: { error: error.message }}
             }
            },
            providesTags: ['UserProgress']
        }),
        fetchSpecificQuestionProgress: builder.query({
            queryFn: async ({ uid, questionId }) => {
                try {
                    const docRef = doc(db, `userProgress/${uid}/progressEntries`, questionId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        return { data: { id: docSnap.id, ...docSnap.data() } };
                    } else {
                        return { data: null }; // Return null if question progress not found
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: ['UserProgress']
        }),
        fetchUserWithHighestProgress: builder.query({
            queryFn: async () => {
                try {
                    const userProgressCollectionRef = collection(db, 'userProgress');
                    const querySnapshot = await getDocs(userProgressCollectionRef);
                    console.log('User Progress Snapshot Docs Length:', querySnapshot.docs.length);

                    let highestProgressUser = null;
                    let maxProgressCount = 0;

                    // Loop through each user's progress data
                    for (const userDoc of querySnapshot.docs) {
                        const progressEntriesRef = collection(db, `userProgress/${userDoc.id}/progressEntries`);
                        const progressSnapshot = await getDocs(progressEntriesRef);
                        console.log(`Progress Snapshot for user ${userDoc.id}:`, progressSnapshot.size);

                        if (!progressSnapshot.empty) {
                         
                        const progressCount = progressSnapshot.size; // Number of completed tasks
                        console.log(`Progress count for user ${userDoc.id}: ${progressCount}`);

                        if (progressCount > maxProgressCount) {
                            maxProgressCount = progressCount;
                            highestProgressUser = { uid: userDoc.id, progressCount };
                        }
                    }
                    }

                    return highestProgressUser 
                        ? { data: highestProgressUser }
                        : { error: "No progress data available" };
                } catch (error) {
                    return { error: error.message };
                }
            },
            providesTags: ['UserProgress'],
        }),
        storeUserProgress: builder.mutation({
            queryFn: async ({ uid, progressData }) => {
                try {
                 
                    const progressRef = doc(collection(db, `userProgress/${uid}/progressEntries`), progressData.questionid);
                    
                    await setDoc(progressRef, { status: progressData.status, completedAt: new Date().toISOString() });
                    
                    return { data: 'Progress entry added successfully' };
                } catch (error) {
                    return { data: { error: error.message } };
                }
            },
            invalidatesTags: ['UserProgress'],
        }),

        
        

    })
})

export const { useFetchUserProgressQuery, useFetchSpecificQuestionProgressQuery , useFetchUserWithHighestProgressQuery ,useStoreUserProgressMutation } = userProgressApi