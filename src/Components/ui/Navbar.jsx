import { IconBellFilled, IconSettings,IconLogout,IconSun, IconMoonFilled } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '../../redux/reducers/Theme/ThemeSlice'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../redux/Api/authApiSlice'
function Navbar() {
     const dispatch=useDispatch()
     const navigate=useNavigate()
     const [logout]=useLogoutMutation()
      const darkmode=useSelector((state)=>state.theme.isDarkmode)
  return (
    <header className='py-6 px-8 bg-mainClr dark:bg-darkmodeMainClr flex justify-end  items-center sticky top-0  z-10 text-textCLr dark:text-darkmodeTextClr '>
       
    <div className='flex gap-[1.5rem] items-center'>
     {!darkmode?<IconSun onClick={()=>dispatch(toggleMode())} title='lightmode'/>:<IconMoonFilled onClick={()=>dispatch(toggleMode())} title='darkmode'/>}
    <IconBellFilled  title='notification'/>
    <IconSettings title='setting'/>

    <IconLogout className='hover:text-secondaryClr' title='logout' onClick={()=>{logout()}} />
    </div>
   
 </header>
  )
}

export default Navbar