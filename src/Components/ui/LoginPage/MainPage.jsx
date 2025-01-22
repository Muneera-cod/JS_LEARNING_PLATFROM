import picture from '../../../assets/Images/mainpage.webp'
import aboutus from '../../../assets/Images/aboutpage1.webp'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { setView } from '../../../redux/reducers/View/ViewSlice'
import { lazy } from 'react'
import Carosall from './MainPageParts/Carosall'
function MainPage() {
    const dispatch = useDispatch()
  return (
    <>
    <main className='flex flex-col min-h-screen  gap-10 sm:p-[16px] md:p-[20px] bg-mainClr dark:bg-darkmodeMainClr text-textCLr dark:text-darkmodeTextClr'>
    
        <section className='flex sm:flex-col lg:flex-row sm:gap-4  xl:gap-8  min-h-[60vh] sm:pt-24 md:pt-20 lg:pt-36 lg:pb-24 sm:px-2 md:px-8 lg:px-10 xl:px-12'>
            <div className='flex flex-col basis-2/3 sm:gap-6 md:gap-8 sm:items-center   md:items-start justify-center sm:text-center md:text-left'>
                {/* <p className='sm:text-[26px] md:text-[28px] lg:text-[26px] lg:text-[40px] font-[700] '>Ready to master JavaScript?</p> */}
                <p className='sm:text-[22.5px] md:text-[28px]  lg:text-[32px] xl:text-[40px]  font-[700] uppercase'>LEARN JavaScript for free</p>

                <p className='sm:text-[15px] md:text-[20px] font-[400] opacity-60 line-clamp-4 lg:pr-20'><span className='pb-2 sm:text-[16px] leading-[32px] md:text-[28px] lg:text-[26px] lg:text-[30px] text-black dark:text-white font-[700] block min-w-full'>Ready to master JavaScript..? </span>Explore interactive lessons, tackle coding challenges, and track your progress—all in one place.<br/> Let's turn your coding goals into reality!</p>

                <button onClick={()=>dispatch(setView(1))} className='shake-button text-mainClr  sm:text-sm md:text-md sm:px-6 md:px-8 py-3 bg-[#404040] dark:bg-[rgb(240,219,79)] shadow-sm font-[700] rounded-full hover:bg-[rgb(240,219,79)] dark:hover:bg-lighterSeocndaryClr'>Get Started</button>
            </div>
            <div className='basis-1/3 flex items-center  justify-end  gap-2 '>
                  
                    <img src={picture} loading='lazy'  className=' sm:hidden md:block '/>
                
            </div>
        </section>

        <section className='flex  sm:-m-[16px] md:-m-[20px]  slide-in-right gradient    bg-opacity-10   min-h-[40vh]'>
       
       <div className='flex sm:px-6 md:px-10 lg:px-20 py-24 items-center sm:text-center xl:text-left flex-col basis-full gap-8 rounded-md' >
          <h2 className='mb-4 sm:text-[18px] md:text-[20px] lg:text-[24px] lg:text-[26px] tracking-widest  font-[700] uppercase'>Unlock the Power of JavaScript—Learn, Code, and Succeed</h2>
          
          <p className='sm:text-[16px] md:text-[18px] lg:text-[21px] font-[400] opacity-60 '>Elevate your coding journey with hands-on practice, AI-powered guidance, and a streamlined roadmap to mastery.</p>
          <ul  className='md:px-2 py-4  flex flex-col gap-3 sm:text-[16px] md:text-[17px] lg:text-[19px] font-[700]'>
              <li>A sleek, modern workspace with a dynamic interface displaying JavaScript code execution and AI-powered suggestions.</li>
              <li>Icons or graphical elements like progress trackers, badges, and a "Code Passed" confirmation popping up on the screen.</li>
        </ul>
        <button className=' mt-4 text-mainClr sm:text-sm md:text-md sm:px-6 md:px-8 py-3 bg-[#404040] flex gap-4  shadow-sm font-[700] rounded-lg hover:bg-[rgb(240,219,79)] dark:hover:bg-lighterSeocndaryClr w-fit'>Start Now</button>

          </div>
        </section>
        <section className='sm:-m-[16px] md:-m-[20px] md:px-10 py-40  slide-in-right   bg-opacity-10   min-h-[40vh]'>
           <Carosall/>
         
        </section>


        <section className='flex sm:p-4 md:p-8   min-h-[40vh] slide-in-left '>
            <div className='flex   gap-8 rounded-md items-center justify-between sm:p-0 md:p-10 w-full'>
               <img loading={lazy} src={aboutus} className='sm:hidden md:block max-w-[50%] rounded-md'></img>
              

               <div className=' items-center justify-center md:px-8 xl:px-14 py-10 flex flex-col gap-6 md:border-l-4  h-full rounded-sm md:border-primaryClr'>

                <p className='sm:text-[18px] md:text-[22px] lg:text-[24px] lg:text-[28px] font-[700] '>About Master .js</p>
                <p className='text-center sm:text-sm lg:text-md'>
                Master .js is a modern learning platform designed for aspiring developers to master JavaScript through interactive challenges and AI-powered learning tools. Whether you're a beginner or looking to advance your skills, we've got you covered!</p>
               </div>
            </div>
            
        </section>
   
     
    </main>
    <Footer/>
    </>
  )
}

export default MainPage