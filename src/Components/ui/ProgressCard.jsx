import React from 'react'
import { Progress } from '@mantine/core';
import '@mantine/core/styles.css';
function ProgressCard({ title, progress, count, bgColor, value , buttonText}) {
  return (
    <div className={`p-10 rounded-lg shadow-md flex flex-col gap-[1rem]  ${bgColor} scaleLarge`}>
    {/* <div className="text-2xl  ">{icon}</div> */}
    <div className='flex flex-col  gap-4 rounded-md'>
      <h3 className="text-md tracking-widest font-[700]">{ value ? title : 'No progress to show'}</h3>
      <p className="text-xl font-bold text-secondaryClr">{progress}</p>
      {count && <p className="text-sm font-[700] opacity-50">{count} Tasks</p>}
    </div>
    {/* <div className='basis-1/2 p-4  flex flex-col gap-[2rem] flex-1'> */}
    <Progress value={value} color='#334a47'  className='' />
    {/* <Progress  color='blue' className='' /> */}
    {/* </div> */}
    {buttonText && value &&    <button  type='submit' className={`ml-auto w-1/4  bg-secondaryClr  border-2 border-primaryClr text-mainClr p-3 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr  `}>{buttonText}</button>  }
  </div>
  )
}

export default ProgressCard