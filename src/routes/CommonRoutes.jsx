import { createBrowserRouter } from "react-router-dom";
import { lazy,Suspense } from "react";
// const LearnersHome=lazy(()=> import("../features/Learners/Components/pages/SubPages/LearnersHome"));
import LoginPage from "../Components/pages/LoginPage";

export const commonRouter = createBrowserRouter([
    {
        path:'/',
        element:<LoginPage/>
    }
     ,
       
//    {
//                 path: '/',
//                 element: (<Suspense fallback={<LoadingPage/>}> 
//                                <ProtectedRoutes element={<LearnersHome/>} currUserRole={'learner'}>
//                                </ProtectedRoutes>            
//                         </Suspense>)
//    },  
         
])