import { useState } from "react"
import { IconEdit, IconTrashFilled } from "@tabler/icons-react"
import { useDeleteQuestionMutation  } from "../../../../../redux/Api/QuestionApiSlice"
import { useNavigate } from "react-router-dom"
function QuestionContainer({slno,question,level,id}) {
    const [hover,setHover]=useState(false)
    const [deleteQuestion,{isLoading,isSuccess,isError}]=useDeleteQuestionMutation()
      isSuccess && alert('Question deleted successfully')
      isError && alert('An error occured  while deleting the question')
      const navigate=useNavigate()
      const questionView=(id)=>{
        navigate(`${id}`);
        dispatch(setSubView(1))
     }
  return (
    <div  className='flex shadow bg-primaryClr p-6 rounded-md gap-4 overflow-hidden' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
        <p className='opacity-50 '>{slno}.</p>
         <div className='flex-1 hover:opacity-50 hover:underline' onClick={()=>questionView(id)}>{question}</div>
         {hover?
         <div className="flex gap-2">{ isLoading ? 'Deleting..' : <><IconTrashFilled onClick={()=>deleteQuestion(id)}/><IconEdit onClick={()=>navigate(`update_question/${id}`)}/></> }</div>
         :<p >{level}</p>}
    </div>
   
  )
}

export default QuestionContainer