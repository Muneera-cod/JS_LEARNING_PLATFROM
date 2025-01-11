import { useState } from "react"
import { IconStarFilled } from "@tabler/icons-react"
import { useFetchLearnersQuery } from "../../redux/Api/LearnerApiSlice"
import { Loader } from "@mantine/core"
import WeeklyRankingTable from "./WeeklyRankingTable"
function WeeklyRanking({ text }) {
  const { data: learners ,isLoading: learnersLoading  , isError: learnersError,error,isSuccess } = useFetchLearnersQuery()

  console.log(learners,'heloo')
   const [rankMap, setRankMap] = useState(new Map());
  const sortedLearners = isSuccess &&  [...learners].sort((a, b) => (rankMap.get(b.id) || 0) - (rankMap.get(a.id) || 0)
);
   if(learnersLoading){
           return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
         }
   if(learnersError){
          return <div className='min-h-[15rem] w-full flex items-center justify-center'>An Error occured{error}</div>
    }
  return (
    <>   
    <p className='text-[18px] font-[700] text-lightmodeTextClr dark:text-darkmodeTextClr leading-[50px] px-2 tracking-wide opacity-30'>Weekly Ranking</p>

    <div className='bg-primaryClr p-6 rounded-xl shadow-md  flex sm:flex-col md:flex-row scaleLarge'>
    <div className=" rounded-lg min-w-[300px] grid grid-cols-3">
      
          <div className="py-3 px-4 border-[0.1px] border-primaryClr text-left">Name</div>
          <div className="py-3 px-4 border-[0.1px] border-primaryClr text-left">Rank</div>

          <div className="py-3 px-4 border-[0.1px] border-primaryClr text-left flex gap-2 items-center">Earned <IconStarFilled color="yellow"/></div>
       
   
    {sortedLearners.map((learner,index)=><WeeklyRankingTable  rankMap={rankMap} setRankMap={setRankMap}  rank={index + 1}  learner={learner} key={learner.id}/>

    )}
    
    </div>
    
    {console.log(learners)}
     {text && <p className='m-auto opacity-40 text-lightmodeTextClr dark:text-darkmodeTextClr'>{text}</p>}

   </div>
  </>
  )
}

export default WeeklyRanking