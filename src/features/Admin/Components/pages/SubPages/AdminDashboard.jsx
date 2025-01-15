import WeeklyRanking from '../../../../../Components/ui/WeeklyRanking'
import AdminProgressCard from '../../ui/AdminDashboard/AdminProgressCard'
import LatestStudentJoined from '../../ui/AdminDashboard/LatestStudentJoined'
function AdminDashboard() {
  return (
    <>
     
    <AdminProgressCard/>
    <div className='flex flex-col  w-full'>
    <div className='basis-1/3 p-10 flex  flex-col items-center justify-center '> 
           <WeeklyRanking />
       </div>
       <div className='basis-2/3 p-10  flex flex-col '>
       {/* <div className='flex flex-col gap-[1.5rem] items-center justify-center'>
       <p className='text-left text-[30px] font-[700] w-full'>Js Learning Platform</p>
       <p className=''>Learn how to use JavaScript — a powerful and flexible programming language for adding website interactivity.</p>
       </div> */}
      
           <LatestStudentJoined/>
       
       </div>
       
       
    </div>   
    </>
    
  )
}

export default AdminDashboard