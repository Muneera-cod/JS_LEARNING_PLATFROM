import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import LearnerLayout from '../../layout/LearnerLayout'
import LearnerHome from './SubPages/LearnersHome'
import { Outlet,useLocation } from 'react-router-dom'
import { setView,setSubView } from '../../../../redux/reducers/View/ViewSlice'
function Learners() {
  const currview=useSelector((state)=>state.view.curView)
  console.log('currview',currview)
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(()=>{
      if ( location.pathname ==='/'){
        dispatch(setView(0))
      }
      else if ( location.pathname === '/profile' ||  location.pathname === '/view_questions' || location.pathname === '/learn' ){
        dispatch(setView(1))
        dispatch(setSubView(0))
      }
       else{
             dispatch(setSubView(1))
            }     
          
    },[location.pathname])
    
  return (
    <LearnerLayout>
        { currview === 0 && <LearnerHome/>}
        { currview !== 0 && <Outlet/>}
    </LearnerLayout>
  )
}

export default Learners