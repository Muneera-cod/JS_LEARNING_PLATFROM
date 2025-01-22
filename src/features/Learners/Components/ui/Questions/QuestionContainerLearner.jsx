import { IconCheckbox } from "@tabler/icons-react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setSubView } from "../../../../../redux/reducers/View/ViewSlice"
import { Loader } from "@mantine/core"
import { useFetchSpecificQuestionProgressQuery } from "../../../../../redux/Api/UserProgressApiSlice"
import { auth } from "../../../../../utils/config/firebaseConfig"
import { useEffect } from "react"
function QuestionContainerLearner({ id, question , level ,category ,setSolvedArray}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = auth.currentUser
  const { data,isLoading,isError,isSuccess,isFetching } = useFetchSpecificQuestionProgressQuery({uid:user?.uid ,questionId:id})
 isSuccess && console.log(data)
  const questionView=(id)=>{
    navigate(`${id}`);
    dispatch(setSubView(1))
 }
 useEffect(()=>{
  if(data){

    setSolvedArray((prev)=>[...prev,id])
  }
 },[data])
 if(isLoading ){
         return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
       }
  return (
    <div className='hover:scale-[1.009] flex shadow-md bg-primaryClr p-6 sm:flex-col md:flex-row rounded-md  gap-4 justify-between items-center overflow-hidden '>
    <div className="flex flex-col gap-2 w-full">
        <p className='opacity-50 text-sm'>{level}</p>
        <p className=''>{question}</p>
        <p className='opacity-50 text-sm'>{category}</p>
      </div>
      
      <div onClick={()=>questionView(id)}  className=" cursor-pointer border-[1px] flex gap-4 border-primaryClr sm:min-w-full md:min-w-fit h-fit px-6 py-2 items-center justify-center rounded-md bg-primaryClr opacity-80">
          { isSuccess && <p>{ data ? 'Solved' : 'Solve Challenge'}</p>}  { data && <IconCheckbox/> }
           
        </div> 
 </div>
  )
}

export default QuestionContainerLearner