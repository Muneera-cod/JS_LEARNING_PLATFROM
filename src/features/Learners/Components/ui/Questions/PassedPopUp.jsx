import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconX,IconStarFilled } from '@tabler/icons-react'
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice'
function PassedPopUp({setPopUp}) {
    const isDarkmode = useSelector((state)=>state.theme.isDarkmode)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div className={`fixed z-10 top-[50%] left-[50%]  -translate-y-1/2 -translate-x-1/2 shadow-2xl border-[0.5px] border-primaryClr text-black rounded-xl flex flex-col sm:min-w-[380px] md:min-w-[600px] sm:max-w-[600px] md:max-w-[800px] px-[50px]  py-[50px] items-center gap-[40px]  ${isDarkmode ? 'bg-darkmodeMainClr text-darkmodeTextClr' : 'bg-mainClr text-lightmodeTextClr'}`}>
    <IconX onClick={()=>{setPopUp(false)}} className={`ml-auto w-[1.5rem] h-[1.5rem]  opacity-50 -mt-4 -mr-4 ${ isDarkmode ? 'text-white': 'text-black'}`}/>
    <div className='flex  gap-2 w-full h-full items-center justify-center '>
         <p className='font-[700]'>Congrats..You have  earned a </p> <IconStarFilled color='yellow'/> 
    </div>
   
    <button onClick={()=>{dispatch(setSubView(0));
                     navigate(-1)}} className={`mx-4 my-6 bg-secondaryClr  border-2 border-primaryClr text-mainClr px-4 py-2 min-w-fit rounded-lg bg-opacity-80  font-[700] hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr text-[15px] `}>NEXT CHALLENGE</button>
</div>
  )
}

export default PassedPopUp