import WeeklyRanking from '../../../../../Components/ui/WeeklyRanking'
import LatestStudentJoined from '../../ui/AdminDashboard/LatestStudentJoined'
import { auth } from '../../../../../utils/config/firebaseConfig'
import Activity from '../../../Components/ui/Profile/Activity'
function AdminDashboard() {
  const user = auth.currentUser
  return (
    <>
     
    <div className='flex flex-col  w-full '>
    <div className=' sm:p-2 md:p-4 gap-6 flex sm:flex-col lg:flex-row items-center justify-center '>
      <div className='flex flex-col flex-1  w-full'>
           <p className='flex-1 text-left text-[30px] font-[700] px-4 py-20 max-w-fit'>Hello...{user.displayName}......👋</p>
        <div className='flex flex-col  gap-2'>
         <Activity/>
        </div>  
      </div> 
          
      <div className='flex-1 flex flex-col sm:min-w-full lg:min-w-fit'>
      <WeeklyRanking />
      </div>
     
    </div>
   
       <div className=' sm:p-2 md:p-4   flex flex-col w-full'>
     
      
           <LatestStudentJoined/>
       
       </div>
       
       
    </div>   
    </>
    
  )
}

export default AdminDashboard