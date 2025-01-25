import LearnerList from '../../ui/ManageLeaners/LearnerList'
import Top from '../../ui/Top'
import { IconArrowLeft,IconSearch } from '@tabler/icons-react'
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
function ManageLearners() {
const dispatch = useDispatch()
const navigate = useNavigate()
const [ searchValue, setSearchValue ] = useState('')
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
    <IconArrowLeft className="opacity-50 hover:opacity-100 text-lightsecondaryClr mb-4 -mt-2" onClick={()=>navigate('/')}/>

    <div className={`flex  w-full items-center  pb-4 justify-between `}>
          <div className='w-[185px] rounded-md flex bg-primaryClr items-center px-4 py-[1px] gap-2'>
              <IconSearch className='w-4 h-4'/>
              <input type="text" placeholder={`Search`} value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}  className='border-transparent bg-transparent w-full p-2 rounded-md'/>
          </div>       
       <button className='bg-secondaryClr text-textCLr text-[15px] border-2 border-primaryClr hover:text-mainClr px-4 py-[4px] min-w-fit rounded-md  font-[700] hover:bg-lighterSeocndaryClr  hover:border-secondaryClr' onClick={addnewLearnerClick}>Add Learner</button>
      </div>

      <LearnerList searchValue={searchValue}/>
    </>}
    {subView===1 &&  <Outlet/>}
    
    </>
    
   
  )
}

export default ManageLearners