import React from 'react'
import LearnerDetailsContainer from './LearnerDetailsContainer'
function LearnerList({ searchValue }) {
  return (
    <div className='flex flex-col gap-[0.5rem] p-2 text-textCLr dark:text-darkmodeTextClr '>
      <div className='p-4  flex gap-2  items-center text-[14px] opacity-40  font-[400] pr-[50px]'>
     <p className='font-[700]  opacity-40 mx-2'></p>
     <p className=' flex-1'>Name</p>
     <p className=' sm:hidden md:block flex-1'>Email</p>
     <p className='flex-1'>Joined date</p>
     <div className='flex-1'>Completed</div>
     
  </div>
    <LearnerDetailsContainer searchValue={searchValue}/>
  </div>
  )
}

export default LearnerList