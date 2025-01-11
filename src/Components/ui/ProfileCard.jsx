import React from 'react'
import { IconUserEdit } from '@tabler/icons-react'

function ProfileCard({name,email,photo,setPopUp}) {
  return (
    <div className='flex flex-col gap-[1rem] p-12 bg-primaryClr rounded-md'>
    <IconUserEdit onClick={()=>setPopUp(true)} className='dark:text-white text-black opacity-50 hover:text-lightSecondaryClr'/>
    <div className='flex flex-col gap-[1.5rem] justify-center items-center'>
    <div className='max-w-[150px] max-h-[150px]  bg-zinc-100 overflow-hidden rounded-full '>
        <img src={photo} className='min-w-[150px] min-h-[150px] object-contain'/>
    </div>
    
    <div className='flex flex-col gap-[1rem] justify-center items-center '>
        <p className='font-[700] opacity-70'>{name}</p>
        <p className='font-[700]  opacity-70'>{email}</p>
    </div>
    </div>
</div>
  )
}

export default ProfileCard