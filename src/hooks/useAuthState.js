import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { authApi } from '../redux/Api/authApiSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/config/firebaseConfig';
import { auth } from '../utils/config/firebaseConfig';

const useAuthState = () => {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();

          dispatch(authApi.util.updateQueryData('checkAuth', undefined, (state) => ({
            ...state, // Spreading the existing state
            user: user,
            role: userData?.role || '',
          })));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // If no user, clear the state
        dispatch(authApi.util.updateQueryData('checkAuth', undefined, (state) => ({
          ...state, // Spreading existing state
          user: null,
          role: '',
          error: null
        })));
      }
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return initialized;
};

export default useAuthState;

// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { authApi } from '../redux/Api/authApiSlice';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../utils/config/firebaseConfig';
// import { auth } from '../utils/config/firebaseConfig';
// const useAuthState = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
     
//         const userDoc = await getDoc(doc(db, 'users', user.uid));
//         const userData = userDoc.data();
//         dispatch(authApi.util.updateQueryData('checkAuth', undefined, (draft) => {
//           if (draft !== null) {
//           draft.user = user;
//           draft.role = userData.role;}
//         }));
//       } else {
     
//         dispatch(authApi.util.updateQueryData('checkAuth', undefined, (draft) => {
//           if (draft !== null) {
//           draft.user = null;
//           draft.role = '';
//           draft.error = null;
//         }
//         }));
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   return null;
// };

// export default useAuthState;