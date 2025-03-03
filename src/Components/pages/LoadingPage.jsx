import React from 'react'
import { Loader } from '@mantine/core'
function LoadingPage() {
  return (
    <div className='min-h-screen min-w-full font-[700] bg-mainClr dark:bg-darkmodeMainClr text-secondaryClr flex items-center justify-center'>
      <Loader color="yellow" size={60}/>
      </div>
  )
}

export default LoadingPage