import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../../utils/config/firebaseConfig";
import { addDoc, collection, updateDoc, deleteDoc, getDocs, doc, getDoc, query, orderBy,limit,writeBatch } from "firebase/firestore";

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Question'],
  endpoints: (builder) => ({
    fetchQuestions: builder.query({
      queryFn: async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'questions'));
          const questions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return { data: questions };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ['Question']
    }),
    fetchSingleQuestion: builder.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, 'questions', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return { data: { id: docSnap.id, ...docSnap.data() } };
          } else {
            return { error: 'No such document!' };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ['Question']
    }),
    addQuestion: builder.mutation({
      queryFn: async (question) => {
        try {
            const q = query(collection(db, 'questions'), orderBy('order','desc'), limit(1));
            const querySnapshot = await getDocs(q);
            let newOrder = 1;
            if(!querySnapshot.empty){
                const highestOrderDoc = querySnapshot.docs[0];
                newOrder = highestOrderDoc.data().order + 1;
            }
            const newQuestion = {...question, order: newOrder, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), isUpdated: false };
           await addDoc(collection(db, 'questions'), newQuestion);
           return { data: 'Question added successfully' };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Question']
    }),
    updateQuestion: builder.mutation({
      queryFn: async (question) => {
        try {
          const docRef = doc(db, 'questions', question.id);
          await updateDoc(docRef, question);
          return { data: 'Question updated successfully' };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['Question']
    }),
    deleteQuestion: builder.mutation({
      queryFn: async (id) => {
        try {
          // Delete the question
          const docRef = doc(db, 'questions', id);
          await deleteDoc(docRef);

          // Fetch remaining questions
          const questionsRef = collection(db, 'questions');
          const q = query(questionsRef, orderBy('order'));
          const querySnapshot = await getDocs(q);
          const questions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // Update the order of remaining questions
          const batch = writeBatch(db);
          questions.forEach((question, index) => {
            const questionRef = doc(db, 'questions', question.id);
            batch.update(questionRef, { order: index + 1 });
          });
          await batch.commit();

          return { data: 'Question deleted and reordered successfully' };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ['Question']
    })
  })
});

export const {
  useFetchQuestionsQuery,
  useFetchSingleQuestionQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation
} = questionApi;