import { IconBellFilled, IconSettings,IconLogout,IconSun, IconMoonFilled } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '../../redux/reducers/Theme/ThemeSlice'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../redux/Api/authApiSlice'
import logo from '/JSLEARNNEW.webp'
function Navbar() {
     const dispatch=useDispatch()
     const navigate=useNavigate()
     const [logout]=useLogoutMutation()
      const darkmode=useSelector((state)=>state.theme.isDarkmode)
  return (
    <header className='pt-6 pb-8 px-8 bg-mainClr dark:bg-darkmodeMainClr flex justify-between  gap-6 items-center sticky top-0  z-10 text-textCLr dark:text-darkmodeTextClr '>
       <div className='flex items-center gap-2 md:ml-14'><img className='max-w-10 max-h-6' src={logo}/><p className='uppercase sm:text-[10px] md:text-md font-[700]'>MAster JS</p></div>
    <div className='flex gap-[1.5rem] items-center'>
     {!darkmode?<IconSun onClick={()=>dispatch(toggleMode())} title='lightmode' className='sm:w-[21px] md:w-[25px] sm:w-[21px] md:h-[25px]'/>:<IconMoonFilled className='sm:w-[21px] md:w-[25px] sm:w-[21px] md:h-[25px]' onClick={()=>dispatch(toggleMode())} title='darkmode'/>}
    <IconBellFilled className='sm:w-[21px] md:w-[25px] sm:w-[21px] md:h-[25px]' title='notification'/>

    <IconLogout className='sm:w-[21px] md:w-[25px] sm:w-[21px] md:h-[25px] hover:text-secondaryClr' title='logout' onClick={()=>{logout()}} />
    </div>
   
 </header>
  )
}

export default Navbar