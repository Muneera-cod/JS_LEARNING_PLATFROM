import { useState,useEffect } from 'react'
import { useFetchLearnersQuery } from '../../../../../redux/Api/LearnerApiSlice'
import placeholderImg from '../../../../../assets/Images/OIP.jpg'
import {IconArrowNarrowLeft,IconArrowNarrowRight,IconStarFilled} from '@tabler/icons-react'
import { Loader } from '@mantine/core'
import Carousel from './Carousel'
function LearnerCarosal() {

  return (
    <>
      {/* <div className='flex flex-col gap-[50px] flex-1'>
        <div className='text-center flex flex-col gap-[24px]'>
            <p className='text-secondaryClr leading-[50px]  tracking-widest font-[600] uppercase'>Recently joined</p>
            <h1 className='font-[700] text-[50px] leading-[50px]'>The Trust From Clients</h1>
        </div> */}
       
        {/* {isLoading ? <Loader color="yellow"/> :<> {learners  && learners.map((item)=>{
            return(
          <div key={item.id} className='flex flex-col gap-[20px] px-[20px] py-[30px] w-fit  shadow-lg bg-primaryClr  rounded-[15px]  justify-center items-center '>
                <img src={item.photoUrl || placeholderImg } className='w-1/2 h-1/2 rounded-full'></img>
             
             <p className='text-[16px] leading-[20px] font-[400] text-center text-justify'>{item.displayName}</p>
             <div className='flex flex-col  justify-center items-center'>
                <h1 className=' font-[600] text-[14px] '>{item.email}</h1>
                <p className='text-[#666] text-[16px] font-[400]'></p>
             </div>
          </div>
          )})}</> */}
        
{/* } */}

      {/* </div> */}
        {isLoading ? <Loader color="yellow"/> :<Carousel slides={learners}/>  }
    </>
  )
}

export default LearnerCarosal