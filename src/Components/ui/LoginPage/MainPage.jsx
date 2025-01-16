import picture from '../../../assets/Images/picture.png'
import darkpicture from '../../../assets/Images/darkpicture1.png'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { setView } from '../../../redux/reducers/View/ViewSlice'
function MainPage() {
    const dispatch = useDispatch()
  return (
    <>
    <main className='flex flex-col min-h-screen sm:p-[16px] md:p-[20px] bg-mainClr dark:bg-darkmodeMainClr text-textCLr dark:text-darkmodeTextClr'>
    
        <div className='flex sm:flex-col md:flex-row  gap-8  min-h-[60vh] sm:pt-24 md:pt-10 sm:px-8 md:px-10'>
            <div className='flex flex-col basis-1/2 gap-10 items-start justify-center md:px-10'>
                <p className='sm:text-[21px] md:text-[24px] lg:text-[28px] font-[700] opacity-60 '>Start coding journey...</p>
                <p className='sm:text-[14px] md:text-[15px] font-[400] opacity-60 text-justify'>Ready to master JavaScript? Explore interactive lessons, tackle coding challenges, and track your progress—all in one place. Let's turn your coding goals into reality!</p>
                <button onClick={()=>dispatch(setView(1))} className=' px-8 py-2 bg-primaryClr shadow-sm font-[700] rounded-full hover:bg-[rgb(240,219,79,0.1)]'>Get started</button>
            </div>
            <div className='basis-1/2 items-center  justify-end sm:hidden  md:flex  gap-2  '>
                   <div className='md:p-20 lg:p-36 '>
                    <img src={picture} loading='lazy'  className='dark:hidden sm:w-1/2 md:w-fit'/>
                    <img src={darkpicture} loading='lazy'  className='hidden dark:block sm:w-1/2 md:w-fit'/>
                   </div>
            </div>
        </div>
        <div className='flex p-8   min-h-[40vh] '>
            <div className='flex flex-col  gap-2 bg-primaryClr rounded-md items-center justify-between p-10 w-full'>
                
            </div>
            
        </div>
    </main>
    <Footer/>
    </>
  )
}

export default MainPage