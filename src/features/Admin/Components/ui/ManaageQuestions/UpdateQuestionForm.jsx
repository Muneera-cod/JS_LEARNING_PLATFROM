import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateQuestionMutation ,useFetchSingleQuestionQuery} from '../../../../../redux/Api/QuestionApiSlice'
import { IconX,IconPlus } from '@tabler/icons-react'
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice'
import { Loader } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css';
function UpdateQuestionForm() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { question_id } = useParams()
    const { data,isLoading} = useFetchSingleQuestionQuery(question_id)
    const [ updateQuestion,{ isLoading:updationLoading , isSuccess:updationSuccess ,isError : updationError}] = useUpdateQuestionMutation()
    const [values, setValues] = useState({  category:'',
                                             level:'',
                                              title:'',
                                              explanation:'',
                                              steps:[],
                                              textCases:[]  })
   useEffect(() => {
    if (data) {
         setValues({
          category: data.category,
          level: data.level,
          title: data.title,
          explanation: data.explanation,
          steps: data.steps,
          textCases: data.textCases
         });
             }
       }, [data]);                                         
     useEffect(()=>{
        if(updationSuccess){
          notifications.show({
            message: 'Updated Question Successfully',
            withCloseButton: true,
            autoClose: 5000,
             color: 'green'
          });
          navigate(-1);
          dispatch(setSubView(0));
        } },[updationSuccess]
      )
    const handleChange=(e)=>{
             const {name,value}=e.target
             if(name.includes('textCases')){
                    const index=parseInt(name.split('-')[1])
                    const newtextCases=[...values.textCases]
                    name.split('-')[2]==='input'?newtextCases[index].input=value:newtextCases[index].output=value
                    setValues({...values,textCases:newtextCases})
                }
             else if(name.includes('steps')){
                    const index=parseInt(name.split('-')[1])
                    const newsteps=[...values.steps]
                    newsteps[index]=value
                    setValues({...values,steps:[...newsteps]})
                }
             else {  setValues({...values,[name]:value}) }
    }
    const handleDynamicInput=(field,action,index=null)=>{
         setValues((prev)=>{
          const updatedArray=[...prev[field]]
          if ( action === "add" ){
             if ( field === "textCases" ){
                updatedArray.push({input:'',output:''})
             }
             else if (field="steps"){
                  updatedArray.push('')
             }
          }else if ( action === "remove" && index !== null){
             updatedArray.splice(index,1)
          }
          return { ...prev, [field]: updatedArray }
         })
    }  
  const handleSubmit=async(e)=>{
      e.preventDefault()
      console.log('values',values)
      try{
         await updateQuestion({ id:question_id,...values } );
         setValues({
          category: '',
          level: '',
          title: '',
          explanation: '',
          steps: [],
          textCases: []
        });
          alert('Question updated successfully');
      }
      catch(err){
        alert('Failed to update question: ' + (err.message || 'Unknown error'));
        notifications.show({
          message: 'Un error ocurred',
          withCloseButton: true,
          autoClose: 5000,
           color: 'red'
        });
          }
  }
  if(isLoading){
   return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
    
  }
    return (
    <form onSubmit={handleSubmit} className='flex flex-col text-textCLr dark:text-darkmodeTextClr items-start p-[20px] gap-[20px] boxshadow rounded-[15px] min-h-[30vh]  w-full '>
      <div className='flex justify-between items-center w-full text-[14px]'><p className='text-secondaryClr  font-[700]'>Update</p><IconX className='w-[20px] h-[20px]' onClick={()=>{navigate('/manage_questions');dispatch(setSubView(0))}}/></div>
       <div className='flex flex-wrap content-center items-center gap-[30px]'>
           <div className='flex flex-col gap-[5px] items-start justify-center '>
              <p className='text-[14px] font-[700]'>Category</p>
              <div className='w-[180px] flex  gap-[10px] items-center  boxshadow rounded-[7px] '>
                  <input type='text' value={values.category} name="category" onChange={(e)=>handleChange(e)} className=' text-[14px] font-[700]  bg-primaryClr p-4 rounded-md w-full' placeholder='Enter the Category' required></input>
              </div>
            </div>
            <div className='flex flex-col gap-[5px] items-start justify-center '>
              <p className='text-[14px] font-[700]'>Difficulty Level</p>
              <div className='w-[180px] flex  gap-[10px] items-center  boxshadow rounded-[7px] '>
                  <input type='text' value={values.level} name="level" onChange={(e)=>handleChange(e)} className=' text-[14px] font-[700]  bg-primaryClr p-4 rounded-md w-full' placeholder='Enter difficulty level' required></input>
              </div>
            </div>
            <div className='flex flex-col gap-[5px] items-start justify-center w-full'>
              <p className=' text-[14px] font-[700]'>Questions Title</p>
              <div className='md:min-w-[590px] flex  gap-[10px] items-center boxshadow rounded-[7px] w-full'>
               
                  <input type='text' name='title' value={values.title} onChange={(e)=>handleChange(e)} className='text-[14px] font-[700] p-4  bg-primaryClr w-full rounded-md'  placeholder='Enter the question' required></input>
              </div>
            </div>
            <div className='flex flex-col gap-[5px] items-start  w-full'>
                  <p className='text-[14px] font-[700]'>Explanation</p>
                  <div className='md:min-w-[590px] flex gap-[25px] items-center boxshadow rounded-[7px]  w-full'>
                       <textarea name='explanation' value={values.explanation} onChange={(e)=>handleChange(e)} className='text-[14px] font-[700] p-4  bg-primaryClr w-full rounded-md' placeholder='Enter the Explanation' required>
                      </textarea>
                  </div>
             </div>
             <div className='flex flex-col gap-[5px] items-start justify-center w-full'>
             <div className=' flex justify-between items-center w-full'>
             <p className=' text-[14px] font-[700]'>Steps</p>
                  <div className='text-textCLr flex  px-[12px] py-[6px] gap-[10px] font-[700] items-center text-[12px]  bg-secondaryClr rounded-[7px]' onClick={()=>handleDynamicInput("steps","add")}>
                         {values.steps?.length>1?'Add more':'Add Steps'}<IconPlus  className='max-w-[15px] max-h-[15px] ' stroke={2} />
                      </div>
             </div>
              <div className='flex flex-col gap-[10px] items-center boxshadow rounded-[7px]   w-full'>
                 {values.steps?.length!==0?values.steps?.map((_,index)=>{ return(
                  <div  key={index} className='w-full'>
                  <div className='text-[12px] font-[700] flex justify-between items-center w-full px-2 '>
                      <p>Steps {index+1}</p><p onClick={()=>handleDynamicInput("steps","remove",index)}>remove</p>
                  </div>
                  <input  type='text' name={`steps-${index}`} value={values.steps[index]} onChange={(e)=>handleChange(e)} className='text-[14px] font-[700] p-4  bg-primaryClr w-full rounded-md'  placeholder='' required></input>
                  </div>
                 )}):null}
              </div>
            </div>
             <div className='flex flex-col  gap-[15px] items-start w-full'>
             <div className=' flex justify-between items-center w-full'>
             <p className=' text-[14px] font-[700]'>TextCases</p>
                  <div className='text-textCLr flex  px-[12px] py-[6px] gap-[10px] font-[700] items-center text-[12px]  bg-secondaryClr rounded-[7px]' onClick={()=>handleDynamicInput("textCases","add")}>
                         {values.textCases?.length>1?'Add more':'Add TestCases'}<IconPlus  className='max-w-[15px] max-h-[15px] ' stroke={2} />
                      </div>
             </div>
            <div className='flex sm:flex-col   gap-[10px] items-center w-full'>
                  {values.textCases?.length!==0?values.textCases?.map((textCase,index)=>{ return(
                  <div key={index} className='flex flex-col gap-[10px] items-center boxshadow rounded-[7px]  w-full'>
                      <div className='text-[12px] font-[700] flex justify-between items-center w-full px-2 '>
                          <p>Test Case {index+1}</p><p onClick={()=>handleDynamicInput("textCases","remove",index)}>remove</p>
                        </div>
                      <input type='text' name={`textCases-${index}-input`} value={`${values.textCases[index].input}`} onChange={(e)=>handleChange(e)} placeholder='Input' className='p-4  bg-primaryClr text-[14px] font-[700] rounded-md w-full' required></input>
                      <input type='text' name={`textCases-${index}-output`} value={`${values.textCases[index].output}`} onChange={(e)=>handleChange(e)} placeholder='Output' className='p-4  bg-primaryClr text-[14px] font-[700] rounded-md w-full' required></input>
                  </div>)}):null}      
              </div> 
            </div>
            </div>
          <button type='submit' className={`border-2 border-primaryClr ml-auto mr-auto mt-14 bg-secondaryClr text-textCLr hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr dark:text-darkmodeTextClr text-[14px] font-[700] px-[20px] py-[10px] rounded-md ${updationLoading ? 'opacity-80' :''}`} disabled={updationLoading}>{updationLoading ? 'updating...' : 'Update'}</button>  
            {/* {error && <p>Error: {error.message}</p>} */}
            {updationSuccess && <p>Question updated successfully!</p>}
        </form>
  )
}

export default UpdateQuestionForm