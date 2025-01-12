import CodeInput from '../../ui/LearnWithAI/CodeInput'
import CodeOuput from '../../ui/LearnWithAI/CodeOuput'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css';
import ChatBox from '../../ui/LearnWithAI/ChatBox';
import { createPortal } from 'react-dom';
function LearnWithAI() {
  const [ aiChatBox,setAiChatBox ] = useState(false)
  const [ codeInput , setCodeInput ] = useState("")
  const [ output ,setOutput ] = useState("")
  const handleCodeRun= async()=>{
    if (!codeInput.trim()) {
      setOutput("Please enter some code to execute.")
      notifications.show({
        message: 'Please enter some code to execute.',
        withCloseButton: true,
        autoClose: 5000,
         color: 'green',
         
      });
      return
  }
    try { 
      const result = eval(`${codeInput}`);
     
      setOutput(JSON.stringify(result) || "No output returned.");
         
     }
     catch (error) { 
      console.error("Error evaluating codeInput:", error);
      setOutput(`Error: ${error.message}`);
     }
    
  }
  console.log(codeInput)
  console.log(output)
  return (
   
    <div className='grid lg:grid-cols-2 gap-4 pb-6 pt-20 px-4 sm:h-[1000px] lg:h-[700px] '>
      <button onClick={()=>setAiChatBox(true)} className={`w-1/4  dark:bg-secondaryClr dark:bg-opacity-20  border-2 border-primaryClr text-zinc-400  dark:text-white p-2 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr  absolute top-8 right-12 `}>Ask AI</button>
        <div className='flex items-center flex-col basis-1/2 border-2 border-primaryClr rounded-md p-4 shadow-sm min-h-full'>
            <p className='sm:text-sm md:text-md font-[700] text-lg opacity-60'>Code Input</p>
            <CodeInput codeInput={codeInput} setCodeInput={setCodeInput}/>
            <button onClick={handleCodeRun} 
             className={`w-1/4  bg-secondaryClr  border-2 border-primaryClr text-mainClr p-2 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr  `}>
               Run</button>
        </div>
       
        <div className=' flex items-center flex-col basis-1/2 border-2 border-primaryClr rounded-md p-4 shadow-sm h-full'>
            <p className='sm:text-sm md:text-md font-[700] text-lg opacity-60'>Code Output</p>
            <CodeOuput  output={output}/>
        </div>
       
        { aiChatBox && createPortal(<ChatBox setAiChatBox={setAiChatBox}/>,document.body)}

    </div>
        
  
  )
}

export default LearnWithAI