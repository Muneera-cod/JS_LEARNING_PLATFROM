import { useState,useEffect } from 'react'
import { useFetchLearnersQuery } from '../../../../../redux/Api/LearnerApiSlice'
import placeholderImg from '../../../../../assets/Images/OIP.jpg'
import {IconArrowNarrowLeft,IconArrowNarrowRight,IconStarFilled} from '@tabler/icons-react'
import { Loader } from '@mantine/core'
function LearnerCarosal() {
      const { data,isLoading } = useFetchLearnersQuery()
      const [carosal,setCarosal]=useState(0) 
      const [learners,setLearners] = useState([])
console.log(carosal)
  useEffect(()=>{
    if(data){
        setLearners([...data])
    }
  },[data])
  useEffect(()=>{
     handleRightSlide}
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
  peoples.push(poeditm)
  console.log(poeditm)
  console.log(learners)
  setCarosal(carosal+1)
} 
  return (
    <>
      <div className='flex flex-col gap-[50px]'>
        <div className='text-center flex flex-col gap-[24px]'>
            <p className='text-secondaryClr leading-[50px]  tracking-widest font-[600] uppercase'>Recently joined</p>
            <h1 className='font-[700] text-[50px] leading-[50px]'>The Trust From Clients</h1>
        </div>
        <div className='flex justify-center gap-[20px]'>
            <div onClick={()=>handleLeftSlide()} className='w-[50px] h-[50px] hover:bg-markClr hover:text-white hover:border-none border-2 border-markClr  text-markClr rounded-full flex items-center justify-center'>
                <IconArrowNarrowLeft stroke={2} size={35} />
            </div>
            <div onClick={()=>handleRightSlide()} className='w-[50px] h-[50px]  border-2 border-markClr text-markClr hover:bg-markClr hover:border-none  hover:text-white rounded-full flex items-center justify-center'>
                <IconArrowNarrowRight stroke={2} size={35} />
            </div>
        </div>
        {isLoading ? <Loader color="yellow"/> :<div className='flex gap-[30px]  md:justify-center items-center overflow-hidden'>
          {learners  && learners.map((item)=>{
            return(
          <div key={item.id} className='flex flex-col gap-[20px] px-[20px] py-[30px]  shadow-lg bg-primaryClr  rounded-[15px]  justify-center items-center  sm:min-w-[260px] md:min-w-72 max-w-72'>
             <div>
                <img src={item.photoUrl || placeholderImg } className='rounded-full'></img>
             </div>
             <p className='text-[16px] leading-[20px] font-[400] text-center text-justify'>{item.displayName}</p>
             <div className='flex flex-col  justify-center items-center'>
                <h1 className='uppercase font-[600] text-[16px] '>{item.email}</h1>
                <p className='text-[#666] text-[16px] font-[400]'>{item.job}</p>
             </div>
          </div>
          )})}
        
        </div>}
      </div>
    </>
  )
}

export default LearnerCarosal