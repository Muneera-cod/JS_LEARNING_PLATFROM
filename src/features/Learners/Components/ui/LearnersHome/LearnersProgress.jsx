import { RingProgress,Text,Flex } from "@mantine/core"
import { auth } from "../../../../../utils/config/firebaseConfig"
import { useFetchQuestionsQuery } from "../../../../../redux/Api/QuestionApiSlice"
import { useFetchUserProgressQuery } from "../../../../../redux/Api/UserProgressApiSlice"
import { Loader } from "@mantine/core"
import { useEffect,useState } from "react"
function LearnersProgress({ id }) {
  
  const { data:progressData ,isLoading :loading ,isError : error } = useFetchUserProgressQuery(id)
  const { data:questions , isLoading ,isError } = useFetchQuestionsQuery()
  const [totalEasy,setTotalEasy] = useState([])
  const [totalMedium,setTotalMedium] = useState([])
  const [totalHard,setTotalHard] = useState([])
  const [easy, setEasy] = useState([]); 
  const [medium, setMedium] = useState([]); 
  const [hard, setHard] = useState([]);
  useEffect(()=>{
    if( progressData && questions){
      const findQuestionsfromprogressData = questions.filter((question)=> progressData.some((progress)=> progress.id === question.id))
      console.log(findQuestionsfromprogressData)
      setEasy(findQuestionsfromprogressData?.filter((question)=>question.level.toLowerCase() === 'easy'))
      setMedium(findQuestionsfromprogressData?.filter((question)=>question.level.toLowerCase() === 'medium'))
      setHard(findQuestionsfromprogressData?.filter((question)=>question.level.toLowerCase() === 'hard'))
      setTotalEasy(questions.filter((question)=>question.level.toLowerCase() === 'easy'))
      setTotalMedium(questions.filter((question)=>question.level.toLowerCase() === 'medium'))
      setTotalHard(questions.filter((question)=>question.level.toLowerCase() === 'hard'))  
    }
  }
  ,[progressData,questions])
 
   if(isLoading || loading){
          return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
        }
  return (
    <div className='flex sm:flex-col-reverse shadow-md md:flex-row w-full bg-primaryClr sm:p-4 md:p-6 rounded-lg gap-6 scaleLarge'>
        <div className='flex flex-col p-2 md:basis-1/4'>
        <Flex align={'center'} justify={'center'}  >
                <RingProgress
                size={60}
                thickness={7}
                sections={[{ value: easy.length && (easy.length / totalEasy.length) * 100, color: 'green' }]}
            /><Text c={'green'} fw={700} ta="center" size="xs" miw={65} maw={65} >{`${easy.length} / ${totalEasy.length}`} Easy</Text>
        </Flex>
        <Flex align={'center'} justify={'center'}  >
                <RingProgress
                size={60}
                thickness={7}
                    sections={[{ value: medium.length && (medium.length / totalMedium.length) * 100, color: 'yellow' }]}
                    
                /><Text c={'yellow'} fw={700} ta="center" miw={65}   maw={65} size="xs">{`${medium.length} / ${totalMedium.length}`} Medium</Text>
       </Flex>
       <Flex align={'center'} justify={'center'}  >
                <RingProgress
                size={60}
                thickness={7}
                    sections={[{ value: hard.length && (hard.length / totalHard.length) * 100, color: 'red' }]}
                    
                />
                {console.log( (hard.length / totalHard.length) * 100)}
                <Text c={'red'} fw={700} ta="center" miw={65}  maw={65} size="xs">{`${hard.length} / ${totalHard.length}`} Hard</Text>
      </Flex>
        </div>
        <div className='basis-3/4 flex p-6 items-center justify-between  rounded-md   bg-secondaryClr dark:bg-opacity-[0.02] bg-opacity-[0.06]  dark:text-white text-textCLr '>
              <div className="flex flex-col">
                  <p className="font-[700] text-lg">Total challenges completed</p>
                   <p>{progressData.length} out of {questions.length}</p>

              </div>
                    <RingProgress
                label={
                    <Text size="xs" ta="center">
                      Total
                    </Text>
                }
                sections={[
                    { value: easy.length && (easy.length / questions.length) * 100, color: 'green' },
                    { value: medium.length && (medium.length / questions.length) * 100, color: 'yellow' },
                    { value: hard.length && (hard.length / questions.length) * 100, color: 'red' },
                ]}
                />
                
        </div>
    </div>
  )
}

export default LearnersProgress