import { IconTrophyFilled,IconLineDotted  } from '@tabler/icons-react'
import { useFetchUserProgressQuery } from '../../../../../redux/Api/UserProgressApiSlice'
import { Loader } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
function LearnerCard({learner,questions,index}) {
    const navigate = useNavigate()
    const { data: progressData, isLoading: progressLoading } = useFetchUserProgressQuery(learner.id)
    const handleNavigation=(id)=>{
       navigate(id)
    }
  return (
    <div onClick={()=>handleNavigation(learner.id)} className='p-4 bg-primaryClr rounded-md shadow-md flex gap-2  items-center text-[14px]  font-[400] hover:opacity-60'>
     <p className='font-[700]  opacity-40 mr-2'>{index+1}</p>
     <p className=' flex-1'>{learner?.displayName}</p>
     <p className=' sm:hidden md:block flex-1'>{learner?.email}</p>
     <p className='flex-1'>{new Date(learner.createdAt.seconds * 1000).toLocaleString().split(',')[0]}</p>
     {console.log('Hlo',new Date(learner.createdAt.milliseconds))}
     {console.log('HI',learner.createdAt.seconds)}
     {progressLoading  ? <Loader color="yellow" size="xs" /> :<><div className='flex-1'>
               {progressData?.length }
      </div>
       {progressData?.length >= (3 * questions.length)  / 4 ? <IconTrophyFilled color='#FFD700'/> : ( progressData?.length >= questions.length / 2 ? <IconTrophyFilled color='#cd7f32'/> :(progressData?.length === 0? <IconLineDotted/> : <IconTrophyFilled color='grey'/>))}</>}
  </div>
  )
}

export default LearnerCard