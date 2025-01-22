import ProfileCard from '../../../../../Components/ui/ProfileCard'
import profilepic from '../../../../../assets/Images/OIP.jpg'
import Activity from '../../ui/Profile/Activity'
import { auth } from '../../../../../utils/config/firebaseConfig'
import ProfileDetails from '../../../../../Components/ui/ProfileDetails'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import UpdateProfile from '../../../../../Components/ui/Form/UpdateProfile'
function Profile() {
  const [popUp, setPopUp] = useState(false)

  return (
    <>
    <div className='flex sm:flex-col md:flex-row gap-[1rem] h-full p-[20px] md:items-center sm:justify-center'>

          <div className='flex flex-col sm:basis-full md:basis-1/2 h-full gap-[1rem] justify-center'>
             <ProfileCard popUp={popUp} setPopUp={setPopUp} photo={ auth.currentUser?.photoURL ? auth.currentUser?.photoURL : profilepic } name={auth.currentUser?.displayName ? auth.currentUser?.displayName : 'No name added'} email={auth.currentUser?.email}/>
              <Activity/>
          </div>
          <ProfileDetails/>
    </div>
    {popUp && createPortal(<UpdateProfile setPopUp={setPopUp}/>,document.body)}
    </>
    
  )
}

export default Profile