import { IconStarFilled, IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSubView } from "../../../../../redux/reducers/View/ViewSlice";
import { useFetchSpecificQuestionProgressQuery } from "../../../../../redux/Api/UserProgressApiSlice";
import { auth } from "../../../../../utils/config/firebaseConfig";
function ViewQuestion({ category,level,title,explanation,steps,textCases,id }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = auth.currentUser
  const { data , isLoading , isError , isSuccess} = useFetchSpecificQuestionProgressQuery({ uid: user.uid ,questionId:id })
  isSuccess && console.log(data)
  return (
    <> 
   <IconX className='mr-auto  mb-4' onClick={()=>{dispatch(setSubView(0));navigate(-1)}}/> 
    { data && <div className='p-2 flex w-full items-center justify-end gap-2 font-[700] text-black dark:text-white opacity-60'>Solved<IconStarFilled  color="yellow"/></div>}
    <p className='px-2 pb-4 pt-2 font-[700] text-lg tracking-widest'><span className='opacity-60'>CATAGORY:</span> {category}</p>
    <div className='flex flex-col gap-[1rem] '>
        <div className='flex flex-col p-6 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr'>
            <div className={`${level === 'Easy' ? ' border-green-300 text-green-800 bg-green-400 ' : (level === 'Hard' ? 'border-red-300 text-red-800 bg-red-50':'border-yellow-300 text-yellow-800 bg-yellow-200')} ml-auto   max-w-fit px-[15px] py-[5px] rounded-md border-2 `}>
                {level}
            </div>
         <div className='flex gap-4 p-4 '>
           <p className='opacity-50 test-sm font-[700]'>1</p>
           <p >{title}</p>
         </div>
        </div>

        <div className='flex flex-col p-6 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr gap-10'>
            <div className='max-w-fit  font-[700]'>
                {explanation}
            </div>
         <div className='flex flex-col gap-2'>
           <p className='text-[18px] tracking-wide '>Steps</p>
           {steps?.map((step,index)=><div key={index} className='flex  gap-4 px-2 items-center '><p className='text-sm opacity-50'>{index+1}</p>{step}</div>)}
         </div>
        </div>
      
      <div className='flex sm:flex-col md:flex-row justify-between items-center gap-[2rem]'>
      <div className='basis-3/4 flex flex-col gap-3 w-full'>
        <p className='font-[700]'>Test Cases</p>
        { textCases?.length!==0 ? textCases?.map((testCase,index)=>{return( 
          <div key={index} className="flex flex-col gap-2">
        <div className='border-2 p-4 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr'>
         <p  className='font-[700] px-2 '>Input :<span className='font-[400] mx-6'>{testCase.input}</span></p>
        </div>
        <div className='border-2 p-4 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr'>
         <p className='font-[700] px-2'>Output :<span className='font-[400] mx-6'>{testCase.output}</span></p>
        </div>
        </div>
       )}):<div className='border-2 p-4 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr'> No Test Cases added</div>}        
      </div>
      </div>
      </div>
    </>
  )
}

export default ViewQuestion