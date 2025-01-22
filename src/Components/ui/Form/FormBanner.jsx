import React from 'react'
import imge from '../../../assets/Images/loginpagepic.webp'
// import logo from '/JSLEARNNEW.webp'

function FormBanner({borderRadius}) {
  return (
    <div  className={`text-darkmodeTextClr bg-white min-w-[450px] h-[550px] border-2 border-[rgb(0,0,0,0.1)] shadow-lg  sm:hidden lg:flex lg:flex-col lg:gap-4 items-center overflow-hidden justify-center rounded-${borderRadius}-md`}>
      <img src={imge}  className='w-full h-full object-contain ' />
            
       {/* <div className='flex items-center gap-2 '>
        <img src={logo} loading='lazy' className='max-w-10 max-h-8 ' />
        <p className='uppercase text-md font-[700]'>MAster .JS</p>
        </div>

        bg-gradient-to-r from-white to-primaryClr 
             <p className='text-[14px] font-[700] opacity-60'>A javaScript Learning Platform.</p> */}
        
    </div>
  )
}

export default FormBanner