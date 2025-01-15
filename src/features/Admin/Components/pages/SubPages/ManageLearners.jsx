import LearnerList from '../../ui/ManageLeaners/LearnerList'
import Top from '../../ui/Top'
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function ManageLearners() {
const dispatch = useDispatch()
const navigate = useNavigate()
const subView=useSelector((state)=>state.view.curSubView)
console.log('Subview',subView)

 const addnewLearnerClick=()=>{
  navigate('add_learner');
  dispatch(setSubView(1))
}
  return (
    <>
    { subView===0 && 
    <>
    <Top buttonText={'Add New Learner'}  buttonclick={addnewLearnerClick}/>
      <LearnerList/>
    </>}
    {subView===1 &&  <Outlet/>}
    
    </>
    
   
  )
}

export default ManageLearners