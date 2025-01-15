import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IconLogout2, IconPassword ,IconPhone,IconMoon,IconMoonFilled,IconTrashFilled } from '@tabler/icons-react'
import { verifyEmail } from "../../auth/VerifyEmail"
import { toggleMode } from "../../redux/reducers/Theme/ThemeSlice"
import { useLogoutMutation } from "../../redux/Api/authApiSlice"
import { auth } from "../../utils/config/firebaseConfig"
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { setView } from "../../redux/reducers/View/ViewSlice"
import { useEffect } from "react"
function ProfileDetails() {
    const darkmode=useSelector((state)=>state.theme.isDarkmode)
    const navigate=useNavigate()
  const [logout ,{ isLoading,isError,isSuccess}]=useLogoutMutation()
    const dispatch=useDispatch()
    //  useEffect(()=>{},[auth.currentUser.emailVerified])
     const handleVerifyEmail = async () => {
        const result = await verifyEmail(auth.currentUser);
        if (result.message) {
          alert(result.message);
        } else if (result.error) {
          alert('Error: ' + result.error);
        }
      };
     useEffect(()=>{
      if(isSuccess || isLoading){
        notifications.show({
          message: `${isSuccess ? 'Logged out':'Logging out...'}`,
          withCloseButton: true,
          autoClose: 5000,
           color: 'green'
        });}
    },[isSuccess,isLoading])
  return (
    <div className='flex flex-col justify-between px-10 py-16 sm:gap-[1rem] md:gap-[2px] h-full shadow  sm:basis-full lg:basis-1/2 rounded-md opacity-50'>
      
    <div className='flex flex-col w-full sm:min-h-[300px] gap-[1rem]'>
    { !auth.currentUser?.emailVerified ? <button className='p-4 bg-primaryClr hover:bg-secondaryClr rounded-md' onClick={handleVerifyEmail}>Verify your Email</button> : null }

     <div className='flex flex-col  py-2 gap-2'>
        <p>Informations</p>
        <hr/>
      </div>
   
      <div className='flex  justify-between items-center'>
      <div className='flex  gap-2 items-center'>
      <IconPhone className='w-[15px] h-[15px]'/><p className='text-[14px]'>Phone Number:</p>
      </div>
     <p className='text-[14px]'>{  auth.currentUser?.phoneNumber ? auth.currentUser?.phoneNumber : 'Not added'}</p>
       </div>
       {/* <div className='flex  justify-between items-center'>
      <div className='flex  gap-2 items-center'>
      <IconPassword className='w-[15px] h-[15px]' /><p className='text-[14px]'>Password</p>
      </div>
      <p className='text-[14px]'>Change</p>

      
       
       </div> */}
       <div className='flex  justify-between items-center'>
      <div className='flex  gap-2 items-center'>
      {darkmode?<IconMoonFilled className='w-[15px] h-[15px]'  title='lightmode'/>:<IconMoon className='w-[15px] h-[15px]'  title='darkmode'/>}
      <p className='text-[14px]'>Theme</p>
      </div>
      <p className='text-[14px]' onClick={()=>dispatch(toggleMode())} >{ darkmode ? 'Dark Mode' : 'Light Mode'}</p>

       </div>

   </div>
    <div className="flex flex-col gap-6">
        <div className='flex  justify-between w-full'>
          <p>LogOut</p><IconLogout2 onClick={()=>{logout();dispatch(setView(0));navigate('/')}}/>
        </div>
        {/* <div className='flex  justify-between w-full '>
          <p>Delete</p><IconTrashFilled onClick={()=>{logout();dispatch(setView(0));navigate('/')}}/>
        </div> */}
    </div>
</div>
  )
}

export default ProfileDetails