import React from 'react'
import imge from '../../../assets/Images/javascript.jpg'
function FormBanner({borderRadius}) {
  return (
    <div  className={`w-[500px] h-[592px] border-2 border-black bg-gradient-to-r from-darkmodeMainClr to-black shadow-lg  sm:hidden xl:flex items-center overflow-hidden justify-center rounded-${borderRadius}-md`}>
      <img src={imge} loading='lazy' className='w-full h-full object-contain rounded-r-md' />
        {/* <div>
            <p className='text-[32px] font-[700]'>JS LEARNING PLATFORM</p>
        </div> */}
    </div>
  )
}

export default FormBanner