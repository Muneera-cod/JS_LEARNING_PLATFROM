import React from 'react'
import { IconX } from '@tabler/icons-react'
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice'
import { useDispatch } from 'react-redux'
import { useFetchSingleQuestionQuery } from '../../../../../redux/Api/QuestionApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '@mantine/core'
function QuestionView() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { question_id } = useParams()
    const {data,isLoading,isError,isSuccess}=useFetchSingleQuestionQuery(question_id)
    if(isLoading){
        return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
      }
      if(isError){
          return <div className='min-h-[40rem] w-full flex items-center justify-center'>Something went wrong...</div>
        }
  return (
    <>
   <IconX className='ml-auto mr-3 my-2' onClick={()=>{dispatch(setSubView(0));navigate(-1)}}/>
    <p className='px-2 pb-4 pt-2 font-[700] text-lg tracking-widest'><span className='opacity-60'>CATAGORY:</span> {data?.category}</p>
    <div className='flex flex-col gap-[1rem] '>
        <div className='flex flex-col p-6 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr'>
            <div className={`${data?.level === 'Easy' ? ' border-green-300 text-green-800 bg-green-400 ' : (data?.level === 'Hard' ? 'border-red-300 text-red-800 bg-red-50':'border-yellow-300 text-yellow-800 bg-yellow-200')} ml-auto   max-w-fit px-[15px] py-[5px] rounded-md border-2 `}>
                {data?.level}
            </div>
         <div className='flex gap-4 p-4 '>
           <p className='opacity-50 test-sm font-[700]'>1</p>
           <p >{data?.title}</p>
         </div>
        </div>

        <div className='flex flex-col p-6 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr gap-10'>
            <div className='max-w-fit  font-[700]'>
                {data?.explanation}
            </div>
         <div className='flex flex-col gap-2'>
           <p className='text-[18px] tracking-wide '>Steps</p>
           {data?.steps?.map((step,index)=><div key={index} className='flex  gap-4 px-2 items-center '><p className='text-sm opacity-50'>{index+1}</p>{step}</div>)}
         </div>
        </div>
      
      <div className='flex sm:flex-col md:flex-row justify-between items-center gap-[2rem]'>
      <div className='basis-3/4 flex flex-col gap-2 w-full'>
        <p className='font-[700]'>Test Cases</p>
        { data?.textCases?.length!==0 ? data?.textCases?.map((testCase,index)=>{return( 
          <>
        <div className='border-2 p-4 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr'>
         <p  className='font-[700] px-2 '>Input :<span className='font-[400] mx-6'>{testCase.input}</span></p>
        </div>
        <div className='border-2 p-4 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr'>
         <p className='font-[700] px-2'>Output :<span className='font-[400] mx-6'>{testCase.output}</span></p>
        </div>
        </>
       )}):<div className='border-2 p-4 shadow-md rounded-md border-[0.5px] border-primaryClr bg-primaryClr'> No Test Cases added</div>}        
      </div>
          <div className=' basis-1/4 py-[20px] px-[20px] flex items-center justify-center shadow-md rounded-md border-[0.5px] border-lighterSeocndaryClr  shadow-lg bg-secondaryClr bg-opacity-10  dark:text-white text-textCLr '>
             <p className=''>Total Number of students completed:<span className='text-lighterSeocndaryClr font-[700] tracking-widest text-lg mx-2'>{data?.numOfLearnersCompleted}</span></p>
       
          </div>
          
      </div>
      

    </div>
    </>
  )
}

export default QuestionView