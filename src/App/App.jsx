import { adminrouter } from '../routes/AdminRoutes'
import { RouterProvider } from 'react-router-dom'
import { useState,useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import LoadingPage from '../Components/pages/LoadingPage'
import { learnerrouter } from '../routes/LearnerRoutes'
import { commonRouter } from '../routes/CommonRoutes'
import { auth } from '../utils/config/firebaseConfig'
import { useCheckAuthQuery } from '../redux/Api/authApiSlice'
import useAuthState from '../hooks/useAuthState'
function App() {
  const darkmode=useSelector((state)=>state.theme.isDarkmode)
  const dispatch=useDispatch()
  const [initialized,setInitialized]=useState(false)
  console.log('auth.currentUser',auth.currentUser)
  const { data ,isLoading} = useCheckAuthQuery()
  console.log('data',data)
  const authInitialized = useAuthState(); // Use the custom hook to listen for auth state changes
  console.log('data',data)

  useEffect(() => {
    if (data !== undefined && authInitialized) {
      setInitialized(true);
    }
  }, [data,authInitialized]);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (!darkmode) {
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.add('dark');
    }
}, [darkmode]);


 

  const router=useMemo(()=>{
    if (data?.role === 'admin') return adminrouter
    if (data?.role === 'learner') return learnerrouter
    return commonRouter
  },[data?.role]);

  if ( isLoading || !initialized ) {
      return <LoadingPage/>;
  }


  return ( 
      <RouterProvider router={router}></RouterProvider>
  )
}

export default App
