import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import LoadingPage from '../Components/pages/LoadingPage';
import QuestionView from '../features/Admin/Components/ui/ManaageQuestions/QuestionView';
import ErrorPage from '../Components/pages/ErrorPage';
import LearnerView from '../features/Admin/Components/ui/ManageLeaners/LearnerView';
import UpdateQuestionForm from '../features/Admin/Components/ui/ManaageQuestions/UpdateQuestionForm';
import AddNewLearner from '../features/Admin/Components/ui/ManageLeaners/AddNewLearner';
// Lazy load components
const Admin = lazy(() => import("../features/Admin/Components/pages/Admin"));
const AddQuestion = lazy(() => import("../features/Admin/Components/pages/SubPages/AddQuestions"));
const Profile = lazy(() => import("../features/Admin/Components/pages/SubPages/Profile"));
const ManageQuestions = lazy(() => import("../features/Admin/Components/pages/SubPages/ManageQuestions"));
const ManageLearners = lazy(() => import("../features/Admin/Components/pages/SubPages/ManageLearners"));

export const adminrouter = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <LoginPage />
  // },
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingPage/>}>
        <ProtectedRoutes element={<Admin />} currUserRole={'admin'} />
      </Suspense>
    ),
    children: [
      {
        path: 'profile',
        element: (
          <Suspense fallback={<LoadingPage />}>
           <ProtectedRoutes element={  <Profile />} currUserRole={'admin'} />
          </Suspense>
        )
      },
      {
        path: 'manage_questions',
        element: (
          <Suspense fallback={<LoadingPage />}>
                      <ProtectedRoutes element={ <ManageQuestions />} currUserRole={'admin'} />
                    
        </Suspense>
        ),
           children: [
             { path: 'add_question', element: <ProtectedRoutes element={ <AddQuestion />} currUserRole={'admin'} /> },
             { path: ':question_id',element: <ProtectedRoutes element={ <QuestionView/>} currUserRole={'admin'} />},
             { path : 'update_question/:question_id',element: <ProtectedRoutes element={ <UpdateQuestionForm/>} currUserRole={'admin'} />}
           ]
      },
      {
        path: 'manage_learners',
        element: (
          <Suspense fallback={<LoadingPage />}>
                                <ProtectedRoutes element={ <ManageLearners />} currUserRole={'admin'} />
                               
        </Suspense>
        ),
        children:[
              {path:'add_learner', element:<ProtectedRoutes element={<AddNewLearner/>} currUserRole={'admin'}></ProtectedRoutes>},
              {path:':learner_id',element:<ProtectedRoutes element={<LearnerView/>} currUserRole={'admin'}></ProtectedRoutes>}
        ]
      }
    ]
   
  },
  {
    path:'*',
    element:<ErrorPage/>
  }
  
]);