import CodeInput from '../../ui/LearnWithAI/CodeInput'
import CodeOuput from '../../ui/LearnWithAI/CodeOuput'
import { useState } from 'react'
function LearnWithAI() {
  const [ codeInput , setCodeInput ] = useState("")
  const [ output ,setOutput ] = useState("")
  const handleCodeRun= async()=>{
    if (!codeInput.trim()) {
      setOutput("Please enter some code to execute.")
      return
  }
    try { 
      const result = eval(`(${codeInput})`);
      if (typeof result === "function") {
        setOutput(JSON.stringify(result()) || "No Output returnedrr");  
      } else {
        setOutput(JSON.stringify(result) || "No output returned.");
            }
     
     }
     catch (error) { 
      console.error("Error evaluating codeInput:", error);
      setOutput(`Error: ${error.message}`);
     }
    
  }
  console.log(codeInput)
  console.log(output)
  return (
    <div className='flex sm:flex-col lg:flex-row gap-4 py-10 px-4 h-full'>
        <div className='flex items-center flex-col basis-1/3 border-2 border-primaryClr rounded-md p-4 shadow-sm'>
            <p className='font-[700] text-lg opacity-60'>Code Input</p>
            <CodeInput codeInput={codeInput} setCodeInput={setCodeInput}/>
            <button onClick={handleCodeRun} 
             className={`w-1/4  bg-secondaryClr  border-2 border-primaryClr text-mainClr p-3 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr  `}>
               Run</button>
        </div>
       
        <div className='flex items-center flex-col basis-1/3 border-2 border-primaryClr rounded-md p-4 shadow-sm'>
            <p className='font-[700] text-lg opacity-60'>Code Output</p>
            <CodeOuput  output={output}/>
        </div>
        <div className='flex items-center flex-col basis-1/3 border-2 border-primaryClr rounded-md p-4 shadow-sm'>
            <p className='font-[700] text-lg opacity-60'>Chat Box</p>
        </div>
    </div>
  )
}

export default LearnWithAI