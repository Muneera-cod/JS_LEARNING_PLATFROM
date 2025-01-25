import { IconCircleArrowRightFilled } from '@tabler/icons-react'
import { useFetchLearnersQuery } from '../../../../../redux/Api/LearnerApiSlice'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@mantine/core'
function LatestStudentJoined() {
    const { data , isSuccess ,isError ,isLoading ,error} = useFetchLearnersQuery()
    const navigate = useNavigate()
    if(isLoading){
        return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
      }
      if(isError){
          return <div className='min-h-[40rem] w-full flex items-center justify-center'>Something went wrong...</div>
        }
  return (
    <div className='flex flex-col gap-[1rem]'>
    <h3 className='text-[24px] font-[700] text-secondaryClr leading-[50px] tracking-wide'>Recently joined</h3>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem]'>
     
        {[...data].splice(0,4).map((learner)=>{
            return(
            <div key={learner.id} className='flex flex-col shadow-lg items-center justify-center border-primaryClr border-2 px-10 py-8  gap-[1rem] scaleLarge'>
               <p className=' border-primaryClr w-fit px-4 border-b-2  text-[20px] font-[700] '>{learner.displayName}</p>
               {console.log(learner.createdAt)}

                <p className='text-center text-[16px] opacity-30'>{learner.email}</p>
            </div>
            
    )})}  
        {/* <div className='flex flex-col sm:items-center md:items-start justify-center  p-6'>
            
            <IconCircleArrowRightFilled size={50} className='opacity-10 bg-primaryClr'/>
        </div> */}
        
    </div>
    <p onClick={()=>navigate('manage_learners')} className='ml-auto font-[700] text-sm text-lightmodeTextClr dark:text-darkmodeTextClr opacity-60 hover:opacity-100'>View all learners</p>
    </div>
  )
}

export default LatestStudentJoined