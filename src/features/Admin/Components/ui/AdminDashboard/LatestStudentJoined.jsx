import { useState,useEffect } from 'react'
import {IconArrowNarrowLeft,IconArrowNarrowRight,IconStarFilled,IconCircleArrowRightFilled} from '@tabler/icons-react'
import { useFetchLearnersQuery } from '../../../../../redux/Api/LearnerApiSlice'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@mantine/core'
// import LearnerCarosal from './LearnerCarosal'
// import Carousel from './Carousel'
function LatestStudentJoined() {
    const { data , isSuccess ,isError ,isLoading ,error} = useFetchLearnersQuery()
        //   const { data,isLoading } = useFetchLearnersQuery()
          const [carosal,setCarosal]=useState(0) 
          const [learners,setLearners] = useState([])
    console.log(carosal)
      useEffect(()=>{
        if(data){
            setLearners([...data].sort((a,b)=>b.createdAt-a.createdAt).slice(0,8))
        }
      },[data])
      useEffect(()=>{
         handleRightSlide
        }
           ,[carosal])
    
    const handleRightSlide=()=>{
            const poeditm=learners.pop()
            learners.unshift(poeditm)
            console.log(poeditm)
            console.log(learners)
            setCarosal(carosal+1)
          }
    
     console.log(learners)
     
    const handleLeftSlide=()=>{
      const poeditm=learners.shift()
      learners.push(poeditm)
      console.log(poeditm)
      console.log(learners)
      setCarosal(carosal+1)
    } 
    const navigate = useNavigate()
    if(isLoading){
        return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
      }
      if(isError){
          return <div className='min-h-[40rem] w-full flex items-center justify-center'>Something went wrong...</div>
        }
  return (
    <div className='flex flex-col gap-[0.5rem]   overflow-hidden text-lightmodeTextClr dark:text-darkmodeTextClr'>
    <h3 className='text-[24px] font-[700] text-secondaryClr leading-[50px] tracking-wide'>Recently joined</h3>
     <div className='flex justify-center gap-[20px] '>
                <div onClick={()=>handleLeftSlide()} className='w-[50px] h-[50px] hover:bg-primaryClr  hover:border-none border-2 border-primaryClr  text-markClr rounded-full flex items-center justify-center'>
                    <IconArrowNarrowLeft stroke={2} size={35} />
                </div>
                <div onClick={()=>handleRightSlide()} className='w-[50px] h-[50px]  border-2 border-primaryClr text-markClr hover:bg-primaryClr hover:border-none   rounded-full flex items-center justify-center'>
                    <IconArrowNarrowRight stroke={2} size={35} />
                </div>
            </div>
            <div className='flex  gap-[1rem] w-full '>
    <div className=' gap-[1rem] flex  px-2 py-4'>
     
        {learners.map((learner)=>{
            return(
            <div key={learner.id} className='rounded-md flex flex-col w-[250px]  shadow-lg items-center justify-center border-primaryClr border-2 py-8 px-2 gap-[1rem] scaleLarge'>
               <p className=' border-primaryClr w-fit  border-b-2  text-[20px] font-[700] '>{learner.displayName}</p>
               {console.log(learner.createdAt)}
               {console.log(learner)}
               
                <p className='text-center text-[16px] opacity-30'>{learner.email}</p>
            </div>
            
    )})}  
    </div> 
      
        
    </div>
    <p onClick={()=>navigate('manage_learners')} className='ml-auto font-[700] text-sm text-lightmodeTextClr dark:text-darkmodeTextClr opacity-60 hover:opacity-100'>View all learners</p>
    </div>
  )
}

export default LatestStudentJoined