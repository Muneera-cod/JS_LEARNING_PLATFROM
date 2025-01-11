import { useEffect } from 'react'
import AdminLayout from '../../../Admin/layout/AdminLayout'
import AdminDashboard from './SubPages/AdminDashboard'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setSubView, setView } from '../../../../redux/reducers/View/ViewSlice'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

function Admin() {
   const dispatch=useDispatch()
    const location=useLocation()
    console.log(location)
  const currview=useSelector((state)=>state.view.curView)
  const currSubview=useSelector((state)=>state.view.curSubView)

  console.log('view',currview,'SUbVIew',currSubview)
  useEffect(()=>{
    if(location.pathname==='/'){
      dispatch(setView(0))
    }
    else if ( location.pathname === '/manage_questions' || location.pathname === '/profile' || location.pathname === '/manage_learners' ){
      dispatch(setView(1))
      dispatch(setSubView(0))
      }
      else{
       dispatch(setSubView(1))
      }
    
    
    }
    ,[location.pathname])

  return (
    <AdminLayout>
      
       { currview === 0 && <AdminDashboard/>}
       { currview !== 0 && <Outlet/>}
    </AdminLayout>
  
  )
}

export default Admin