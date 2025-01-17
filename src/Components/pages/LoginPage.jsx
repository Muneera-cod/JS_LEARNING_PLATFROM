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
      <header className='px-6 py-4 h-[70px]  border-[0.5px] border-primaryClr bg-mainClr dark:bg-darkmodeMainClr flex justify-between  gap-6 items-center sticky top-0  z-10 text-textCLr dark:text-darkmodeTextClr '>
       <div className='flex items-center gap-2 '><img className='max-w-12 max-h-8' src={logo}/><p className='uppercase sm:text-[12px] md:text-md font-[700]'>MAster .JS</p></div>
    <div className='flex gap-[1.5rem] items-center px-2'>
     {!darkmode?<IconSun onClick={()=>dispatch(toggleMode())} title='lightmode' className='sm:w-[21px] md:w-[25px] sm:w-[21px] md:h-[25px]'/>:<IconMoonFilled className='sm:w-[21px] md:w-[25px] sm:w-[21px] md:h-[25px]' onClick={()=>dispatch(toggleMode())} title='darkmode'/>}
     { view === 0 && <button onClick={()=>dispatch(setView(1))} className='sm:hidden text-sm md:flex px-8 py-2 bg-primaryClr shadow-sm font-[700] rounded-full hover:bg-[rgb(240,219,79,0.1)]'>SignUp / LogIn</button>}
    </div>
   
 </header>
   {
    view === 0 && <MainPage/>
   }
    { view === 1 && <section className='flex items-center justify-center pt-6'> 
      <IconArrowLeft onClick={()=>dispatch(setView(0))} className='basis-1/6 absolute sm:top-24 md:top-24 sm:left-6 md:left-10  opacity-50 hover:opacity-100 text-lightsecondaryClr '>back</IconArrowLeft>

     
     <div className='w-full h-full flex bg-mainClr dark:bg-darkmodeMainClr  items-center justify-center flex-row sm:px-6 md:px-14 lg:px-16 xl:px-18 sm:py-10 md:py-14 lg:py-16 '>
      
        {currform===0 && <div className='flex w-full items-center justify-center'><LoginForm  currform={currform} setCurrForm={setCurrForm} />
        <FormBanner borderRadius={'r'}/></div>}
        
        {currform===1 && <div className='flex w-full items-center justify-center'><FormBanner  borderRadius={'l'}/><SignUpForm setCurrForm={setCurrForm}/></div>}
        { currform===2 && <div className='flex w-full items-center justify-center '><ForgotPasswordForm  currform={currform} setCurrForm={setCurrForm} /></div>}
    </div></section>
    }
    </>
  )
}

export default LoginPage