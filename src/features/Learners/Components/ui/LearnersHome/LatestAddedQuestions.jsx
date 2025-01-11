import { useFetchQuestionsQuery } from '../../../../../redux/Api/QuestionApiSlice'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { setView } from '../../../../../redux/reducers/View/ViewSlice'
function LatestAddedQuestions() {
    const { data,isLoading,isError } = useFetchQuestionsQuery()
    const navigate = useNavigate()
    const dispatch = useDispatch()
     if(isLoading){
          return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
        }
  return (
    <div className='flex flex-col  px-4  gap-2'>
      <h3 className='text-[20px] font-[700] text-secondaryClr leading-[50px] tracking-wide'>Challeges recently added</h3>
      { data && data.length ? [...data].splice(0,3).map((challenge)=>{
        return(
         <div key={challenge.id} onClick={()=>{navigate(`view_questions/${challenge.id}`);dispatch(setView(1))}}  className='flex shadow bg-primaryClr p-6 rounded-md  overflow-hidden hover:opacity-50'>
            <p className='opacity-50 '></p>
            <div className='flex-1  ' >{challenge.title}</div>
            
            <p >{challenge.level}</p>
         </div>) 
         }) : <p>No challenges Added...</p>}
         <p className='ml-auto px-6 py-2 opacity-60 font-[700] hover:opacity-100' onClick={()=>{navigate('view_questions');dispatch(setView(1))}}>View All</p>
    </div>
  )
}

export default LatestAddedQuestions