import { useState } from 'react'
import FormBanner from '../ui/Form/FormBanner'
import LoginForm from '../ui/Form/LoginForm'
import SignUpForm from '../ui/Form/SignUpForm'
import ForgotPasswordForm from '../ui/Form/ForgotPasswordForm'
import logo from '/JSLEARNNEW.webp'
import { toggleMode } from '../../redux/reducers/Theme/ThemeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { IconMoonFilled,IconSun } from '@tabler/icons-react'
import MainPage from '../ui/LoginPage/MainPage'
import { setView } from '../../redux/reducers/View/ViewSlice'
import { IconArrowLeft } from '@tabler/icons-react'
function LoginPage() {
      const [currform,setCurrForm]=useState(0)
      const darkmode=useSelector((state)=>state.theme.isDarkmode)
      const view = useSelector((state)=> state.view.curView)
      const dispatch = useDispatch()
      console.log('view',view)
  return (
    <>
      <header className='px-8 py-6 h-[70px]  border-[0.5px] border-primaryClr bg-mainClr dark:bg-darkmodeMainClr flex justify-between  gap-6 items-center sticky top-0  z-10 text-textCLr dark:text-darkmodeTextClr '>
       <div className='flex items-center gap-2 '><img className='max-w-12 max-h-8' src={logo}/><p className='uppercase sm:text-[12px] md:text-md font-[700]'>MAster .JS</p></div>
    <div className='flex gap-[1.5rem] items-center px-2'>
      {/* <p className='font-[700] text-[16px] hover:opacity-70 cursor-pointer'>About</p>
      <p className='font-[700] text-[16px] hover:opacity-70 cursor cursor-pointer'>Contact</p> */}
  
     {!darkmode?<IconSun onClick={()=>dispatch(toggleMode())} title='lightmode' className='sm:w-[21px] md:w-[25px] sm:w-[21px] md:h-[25px]'/>:<IconMoonFilled className='sm:w-[21px] md:w-[25px] sm:w-[21px] md:h-[25px]' onClick={()=>dispatch(toggleMode())} title='darkmode'/>}
     { view === 0 && <button onClick={()=>dispatch(setView(1))} className='sm:hidden text-sm md:flex text-mainClr dark:bg-[rgb(240,219,79)] px-6 py-[0.65rem] bg-[#404040] shadow-sm font-[700] rounded-full  dark:hover:bg-lighterSeocndaryClr hover:bg-[rgb(240,219,79)]'>SignUp / LogIn</button>}
    </div>
   
 </header>
   {
    view === 0 && <MainPage/>
   }
    { view === 1 && <main className='flex items-center justify-center pt-6 bg-mainClr dark:bg-darkmodeMainClr'> 
      { (currform ===0 || currform === 1) && <IconArrowLeft onClick={()=>dispatch(setView(0))} className='cursor-pointer basis-1/6 absolute sm:top-24 md:top-24 sm:left-6 md:left-10  opacity-50 hover:opacity-100 text-lightsecondaryClr dark:text-secondaryClr'></IconArrowLeft>}

     
     <section className='w-full h-full flex bg-mainClr dark:bg-darkmodeMainClr  items-center justify-center flex-row sm:px-6 md:px-14 lg:px-16 xl:px-18 sm:py-10 md:py-14 lg:py-16 '>
      
        {currform===0 && <div className='flex w-full items-center justify-center'><LoginForm  currform={currform} setCurrForm={setCurrForm} />
        <FormBanner borderRadius={'r'}/></div>}
        
        {currform===1 && <div className='flex w-full items-center justify-center'><FormBanner  borderRadius={'l'}/><SignUpForm setCurrForm={setCurrForm}/></div>}
        { currform===2 && <div className='flex w-full items-center justify-center '><ForgotPasswordForm  currform={currform} setCurrForm={setCurrForm} /></div>}
    </section></main>
    }
    </>
  )
}

export default LoginPage