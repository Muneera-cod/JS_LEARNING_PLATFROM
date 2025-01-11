import {useEffect, useState} from 'react'

function Notification({title, message, }) {
  const [hide,setHide]=useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(false);
    }, 2000); 

    
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    { hide && <div className='flex  p-6  absolute top-0 right-2' >
        <div onClick={()=>setHide(false)} className='bg-primaryClr border-2 border-secondaryClr border-opacity-20 px-6 py-4 rounded-xl shadow-lg scaleLarge'>
            <h3 className='dark:text-white text-[18px] font-semibold'>{title}</h3>
            <p className='dark:text-white'>{message}</p>
        </div>
    </div>}
    </>
  )
}

export default Notification