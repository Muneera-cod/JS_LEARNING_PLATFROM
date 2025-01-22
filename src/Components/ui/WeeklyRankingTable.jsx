import { useEffect } from "react"
import { useFetchUserProgressQuery } from "../../redux/Api/UserProgressApiSlice"
import { Loader } from "@mantine/core"
function WeeklyRankingTable({ learner , rankMap , setRankMap ,rank , index}) {
    const { data: userprogress , 
            isError: userprogressError , 
           isLoading: userprogressLoading  ,error } = useFetchUserProgressQuery(learner.id)
           console.log(rank)

           useEffect(() => {
            if (userprogress?.length !== undefined) {
                setRankMap((prev) => {
                    const updatedMap = new Map(prev);
                    updatedMap.set(learner.id, userprogress.length);
                    return updatedMap;
                });
            }
        }, [userprogress, learner.id, setRankMap]);
       
           console.log("Rank Map:", rankMap);
        if(userprogressLoading){
            return <Loader color="yellow" size="xs" />
           }
           if(userprogressError){
            return <div className='min-h-[30rem] w-full flex items-center justify-center'>An error occurred while fetching data.{error}</div>
          }
  return (
   <>
        { index < 5 && <> <div className="text-center py-3 px-4 border-[0.1px] border-primaryClr ">{rank}</div>

     <div className="text-center py-3 px-4 border-[0.1px] border-primaryClr break-normal whitespace-normal">{learner?.displayName} </div>

     <div className="text-center py-3 px-4 border-[0.1px] border-primaryClr ">{userprogress?.length}</div></>}
   </>
 
       
    
   
  )
}

export default WeeklyRankingTable