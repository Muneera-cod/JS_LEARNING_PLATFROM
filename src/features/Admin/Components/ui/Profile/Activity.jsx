import { useFetchLearnersQuery } from "../../../../../redux/Api/LearnerApiSlice"
import { useFetchQuestionsQuery } from "../../../../../redux/Api/QuestionApiSlice"
import { Loader } from "@mantine/core"
import { useEffect, useState } from "react"
function Activity() {
  const { data,isLoading,isError } = useFetchLearnersQuery()
  const { data: questions , isLoading: loading  , isError: questionsError} = useFetchQuestionsQuery()
  const [easy, setEasy] = useState([]); 
  const [medium, setMedium] = useState([]); 
  const [hard, setHard] = useState([]);
  useEffect(()=>{
   if(questions){
    setEasy([...questions].filter((question)=>question.level.toLowerCase() === 'easy'))
    setMedium([...questions].filter((question)=>question.level.toLowerCase() === 'medium'))
    setHard([...questions].filter((question)=>question.level.toLowerCase() === 'hard'))
   }
  },[questions])
  if( isLoading || loading ){
    <Loader color="yellow"/>
  }
  if(isError || questionsError){
    return <div className='min-h-[40rem] w-full flex items-center justify-center text-red-400'>Something went wrong...</div>
  }
  return (
    <>
     <div className=' py-[20px] px-[20px] flex items-center justify-center shadow-md rounded-md  shadow-lg bg-secondaryClr bg-opacity-10  dark:text-white text-textCLr '>
             <p className=''>Total Number of Learners joined:<span className='text-lighterSeocndaryClr font-[700] tracking-widest text-lg mx-2'>{data?.length}</span></p>
       
          </div>
          <div className=' py-[20px] px-[20px] flex flex-col gap-[1rem] items-center justify-center shadow-md rounded-md  shadow-lg bg-secondaryClr bg-opacity-10  dark:text-white text-textCLr '>
             <p className=''>Total Number of Questions:<span className='text-lighterSeocndaryClr font-[700] tracking-widest text-lg mx-2'>{questions?.length}</span></p>
              <div className='flex gap-[1rem] opacity-50 text-sm'>
               <p className='tracking-widest'>Easy:<span className='text-lighterSeocndaryClr font-[700]  text-lg mx-[2px]'>{easy.length}</span></p>
               <p className='tracking-widest'>Medium:<span className='text-lighterSeocndaryClr font-[700]  text-lg mx-[2px]'>{medium.length}</span></p>
               <p className='tracking-widest'>Hard:<span className='text-lighterSeocndaryClr font-[700]  text-lg mx-[2px]'>{hard.length}</span></p>

              </div>
          </div>
    </>
  )
}

export default Activity