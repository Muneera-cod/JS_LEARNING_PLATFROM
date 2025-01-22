import { useEffect } from 'react'
import ProgressCard from '../../../../../Components/ui/ProgressCard'
import WeeklyRanking from '../../../../../Components/ui/WeeklyRanking'
import { auth } from '../../../../../utils/config/firebaseConfig'
import LearnersProgress from '../../ui/LearnersHome/LearnersProgress'
import LatestAddedQuestions from '../../ui/LearnersHome/LatestAddedQuestions'
import { useFetchUserProgressQuery } from '../../../../../redux/Api/UserProgressApiSlice'
import { useFetchQuestionsQuery } from '../../../../../redux/Api/QuestionApiSlice'
import { Loader } from '@mantine/core'
function LearnersHome() {
   useEffect(()=>{window.scrollTo(0, 0)},[])
  const user = auth.currentUser
  const { data: progressData, isLoading, isError, isSuccess ,error } = useFetchUserProgressQuery( user?.uid )
  const { data: questions ,isLoading: loading , isError:errorIS } = useFetchQuestionsQuery()
  const finduserCompletedQuestions = questions ? [...questions].filter((question)=> progressData?.some((progress) => progress.id === question.id)  ) : []
  isSuccess ? console.log(finduserCompletedQuestions) :null
  
  if(isLoading || loading){
        return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
      }
      if(isError || errorIS){
        return <div className='min-h-[30rem] w-full flex items-center justify-center'>An Error occured {error}</div>
      }
  return (
    <>
    <div className='flex sm:flex-col lg:flex-row w-full sm:gap-12 md:gap-2'>
      <div className='basis-1/2 flex flex-col '>
           <div className='basis-1/3 flex items-center justify-start sm:px-4 md:px-8 sm:py-20 lg:py-0  '>
                <p className='dark:text-darkmodeTextClr text-lightmodeTextClr font-[700] sm:text-2xl lg:text-3xl typing-container tracking-widest opacity-80'>Hello...{`${ user?.displayName || 'user'}`}....👋</p>
           </div>
           <div className='basis-2/3  md:px-4 justify-end flex flex-col '>
                <h3 className='text-[20px] font-[700] text-lightmodeTextClr dark:text-secondaryClr leading-[50px] tracking-wide my-2'>Your Progress</h3>
                <LearnersProgress  id={ user?.uid }/>
            </div>
      </div>
      <div className='basis-1/2  flex flex-col justify-end md:px-4 pt-4 gap-10'>
      
      
          <ProgressCard title={'Continue your learning'} buttonText={'Continue'} value={ finduserCompletedQuestions?.length / questions?.length * 100 } navigation={'view_questions'}/>
       
        <WeeklyRanking text={'Do more challenges to stay in Top 5'}/>
      </div>

    </div>
    <LatestAddedQuestions/>
    </>
  )
}

export default LearnersHome