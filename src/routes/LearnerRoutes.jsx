import { createBrowserRouter } from "react-router-dom";
import { lazy,Suspense } from "react";
const Learners = lazy(()=> import("../features/Learners/Components/pages/Learners"))
const LearnerPRofile = lazy(()=> import("../features/Learners/Components/pages/SubPages/LearnerPRofile"))
import LoadingPage from "../Components/pages/LoadingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import CodeEditor from "../features/Learners/Components/ui/Questions/CodeEditor";
import ErrorPage from "../Components/pages/ErrorPage";
const  Questions = lazy(()=> import("../features/Learners/Components/pages/SubPages/Questions")) ;
const LearnWithAI = lazy(()=> import("../features/Learners/Components/pages/SubPages/LearnWithAI") )
export const learnerrouter = createBrowserRouter([
 
       
   {
                path: '/',
                element: (<Suspense fallback={<LoadingPage/>}> 
                               <ProtectedRoutes element={<Learners/>} currUserRole={'learner'}/>
                                      
                        </Suspense>),
                children: [
                    {
                        path:'profile',
                        element:  <Suspense fallback={<LoadingPage />}>
                       <LearnerPRofile/>
                      </Suspense>
                    },
                    {
                        path:'view_questions',
                        element: <Suspense fallback={<LoadingPage />}><ProtectedRoutes element={<Questions/>} currUserRole={'learner'}/></Suspense>,
                        children:[
                            { path: ':question_id',element: <ProtectedRoutes element={ <CodeEditor/>} currUserRole={'learner'} />},

                        ]
                    },
                    {
                        path:'learn',
                        element: <Suspense fallback={<LoadingPage />}><ProtectedRoutes element={<LearnWithAI/>} currUserRole={'learner'}/></Suspense>
                    }
                ]        
   },  

   {
    path:'*',
    element:<ErrorPage/>
  }
      
])