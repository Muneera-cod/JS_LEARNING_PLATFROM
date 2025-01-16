import { useState } from "react"
import { IconStarFilled } from "@tabler/icons-react"
import { useFetchLearnersQuery } from "../../redux/Api/LearnerApiSlice"
import { Loader } from "@mantine/core"
import WeeklyRankingTable from "./WeeklyRankingTable"
function WeeklyRanking({ text }) {
  const { data: learners ,isLoading: learnersLoading  , isError: learnersError,isSuccess } = useFetchLearnersQuery()

  console.log(learners,'heloo')
   const [rankMap, setRankMap] = useState(new Map());
  const sortedLearners = isSuccess &&  [...learners].sort((a, b) => (rankMap.get(b.id) || 0) - (rankMap.get(a.id) || 0)
);
let currentRank = 1;
let lastScore = null;
   if(learnersLoading){
           return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
         }
   if(learnersError){
          return <div className='min-h-[15rem] w-full flex items-center justify-center'>An Error occured</div>
    }
  return (
    <>   
    <p className='text-[18px] font-[700] text-lightmodeTextClr dark:text-darkmodeTextClr leading-[50px] px-2 tracking-wide opacity-30'>Weekly Ranking</p>

    <div className='bg-primaryClr p-6 rounded-xl shadow-md gap-4 flex sm:flex-col xl:flex-row scaleLarge'>
    <div className=" rounded-lg min-w-[200px] grid grid-cols-3">
      
          <div className="py-3 px-4 border-[0.1px] border-primaryClr text-left">Name</div>
          <div className="py-3 px-4 border-[0.1px] border-primaryClr text-left">Rank</div>

          <div className="py-3 sm:px-2 md:px-4 border-[0.1px] border-primaryClr text-left flex gap-2 items-center justify-center">Earned <IconStarFilled className='min-w-4 min-h-4' color="yellow"/></div>
       
   
    {sortedLearners.slice(0,5).map((learner,index)=>{
        const points = rankMap.get(learner.id) || 0;
        if (points !== lastScore) {
          currentRank = index + 1;
        }
        lastScore = points;
     return(
    <WeeklyRankingTable  rankMap={rankMap} setRankMap={setRankMap}  rank={currentRank}  learner={learner} key={learner.id}/>

)})}
    
    </div>
    
    {console.log(learners)}
     {text && <p className='m-auto opacity-40 text-lightmodeTextClr dark:text-darkmodeTextClr'>{text}</p>}

   </div>
  </>
  )
}

export default WeeklyRanking