import { useState } from 'react'
import { IconMenu2 } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setView } from '../../redux/reducers/View/ViewSlice'
function Sidebar({Data}) {
    const[open,setOpen]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleNavigation=(link,view)=>{
      navigate(link)
      view===0?dispatch(setView(0)):dispatch(setView(1))
    }
  return (
    <aside className={`shadow-2xl flex  md:py-4 sm:border-t-2 md:border-r-2 border-lighterSeocndaryClr  bg-gradient-to-r from-secondaryClr via-lightSecondaryClr to-lighterSeocndaryClr  sm:flex-row md:flex-col  sm:min-w-full md:min-w-fit md:min-h-full   fixed sm:bottom-0 text-white dark:text-textCLr z-20 `}>
    <IconMenu2 className='sm:hidden md:block ml-6'  onClick={()=>setOpen(!open)}/>
     <div className='flex sm:flex-row md:flex-col   md:py-40  w-full'>
       {Data.map((x,index)=>{
         return(
       <div onClick={()=>{handleNavigation(x.link,index)}} key={x.id} className='flex  sm:flex-col md:flex-row md:gap-[1rem] items-center flex-1 hover:bg-textCLr hover:bg-opacity-20 sm:px-2 md:px-6 sm:pt-3 md:py-4'>
       {x.icon}
       {open && <p className='sm:hidden md:block pr-6'>{x.title}</p>}
       {!open && <p className='text-xs md:hidden'>{x.title}</p>}

       
       </div>
     )})}
    

     
     </div>
 </aside>
  )
}

export default Sidebar