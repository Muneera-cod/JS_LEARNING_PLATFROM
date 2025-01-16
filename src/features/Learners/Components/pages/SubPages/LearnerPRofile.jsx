import ProfileCard from "../../../../../Components/ui/ProfileCard";
import profilepic from '../../../../../assets/Images/OIP.jpg'
import ProfileDetails from "../../../../../Components/ui/ProfileDetails";
import { auth } from "../../../../../utils/config/firebaseConfig";
import { useState,useEffect } from "react";
import { createPortal } from 'react-dom'
import UpdateProfile from "../../../../../Components/ui/Form/UpdateProfile";
import LearnersProgress from "../../ui/LearnersHome/LearnersProgress";
function LearnerPRofile() {

  useEffect(()=>{window.scrollTo(0, 0)},[])
  
  const user = auth.currentUser
  const [popUp, setPopUp] = useState(false)
  return (
    <>
    <div className='flex sm:flex-col lg:flex-row gap-[1rem] h-full p-[20px] lg:items-center sm:justify-center'>
            <div className='flex flex-col sm:basis-full lg:basis-1/2 h-full gap-[1rem] justify-center'>
            <ProfileCard popUp={popUp} setPopUp={setPopUp} photo={ user?.photoURL ? user.photoURL : profilepic } name={ user?.displayName ? user.displayName : 'No name added'} email={ user?.email }/>
            <LearnersProgress id={user?.uid}/>
            </div>
            <ProfileDetails/>

</div>
{popUp && createPortal(<UpdateProfile setPopUp={setPopUp}/>,document.body)}

</>
  )
}

export default LearnerPRofile