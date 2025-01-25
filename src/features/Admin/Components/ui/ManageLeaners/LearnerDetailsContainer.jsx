import React from 'react'
import { useFetchLearnersQuery } from '../../../../../redux/Api/LearnerApiSlice'
import { Loader } from '@mantine/core'
import { useFetchQuestionsQuery } from '../../../../../redux/Api/QuestionApiSlice'
import LearnerCard from './LearnerCard'
function LearnerDetailsContainer({ searchValue }) {
  const { data: learners, isLoading: learnersLoading ,isError: learnerError } = useFetchLearnersQuery()
  const { data:questions , isLoading:loading , isError: questionError} = useFetchQuestionsQuery()
  
  if(learnersLoading || loading){
    return <div className='min-h-[30rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
  }
  if(learnerError || questionError){
    return <div className='min-h-[40rem] w-full flex items-center justify-center text-red-400'>Something went wrong...</div>
  }
  return (
    <>
    { [...learners].filter((learner)=> learner.displayName.toLowerCase().includes(searchValue.toLowerCase()) || learner.email.toLowerCase().includes(searchValue.toLowerCase()))?.map((learner,index)=>{
      return(
      <LearnerCard key={learner.id} questions={questions}  learner={learner} index={index}/>
)})}
  </>
  )
}

export default LearnerDetailsContainer