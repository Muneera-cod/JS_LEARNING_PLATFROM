import React from 'react'
import { Progress } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconTrophyFilled } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom';
function ProgressCard({ title, progress, count, bgColor, value , buttonText ,navigation}) {
  const navigate = useNavigate()
  const handleNavigation = () => {
    if (navigation) {
      navigate(navigation); 
    }
  };

  return (
    <div className={`sm:px-6 md:px-10 sm:py-8 md:py-10 rounded-lg shadow-md flex flex-col gap-[1.5rem]  ${bgColor} scaleLarge`}>
    {/* <div className="text-2xl  ">{icon}</div> */}
    <div className='flex flex-col  gap-4 rounded-md'>
      { value !== 100 && <h3 className="text-md tracking-widest font-[700]">{ value ? title : 'No progress to show'}</h3>}
      <p className="text-xl font-bold text-secondaryClr">{progress}</p>
      {count && <p className="text-sm font-[700] opacity-50">{count} Tasks</p>}
    </div>
    {/* <div className='basis-1/2 p-4  flex flex-col gap-[2rem] flex-1'> */}
    { value !== 100 && <Progress value={value} color='#334a47'  className='' />}
    {value === 100 &&  <div className="flex gap-4 items-center text-md tracking-widest font-[700] "> <IconTrophyFilled size={60} className='border-b-[0.5px] border-primaryClr' color='yellow'/>Congradulations...you finished All....</div>}
    {/* <Progress  color='blue' className='' /> */}
    {/* </div> */}
    {buttonText && value !== 0 && value !== 100 &&  <button onClick={handleNavigation} type='submit' className={`ml-auto w-1/4  bg-secondaryClr  border-2 border-primaryClr hover:text-mainClr text-textCLr px-4 py-2 min-w-fit rounded-lg  font-bold hover:bg-lighterSeocndaryClr  hover:border-secondaryClr   `}>{buttonText}</button>  }
  </div>
  )
}

export default ProgressCard