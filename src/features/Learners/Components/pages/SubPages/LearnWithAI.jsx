import CodeInput from '../../ui/LearnWithAI/CodeInput'
import CodeOuput from '../../ui/LearnWithAI/CodeOuput'
import { useState,useEffect } from 'react'
import { notifications } from '@mantine/notifications'
import { IconArrowLeft,IconPlayerPlayFilled } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import '@mantine/notifications/styles.css';
import ChatBox from '../../ui/LearnWithAI/ChatBox';
import { createPortal } from 'react-dom';
function LearnWithAI() {
  const navigate = useNavigate()
  useEffect(()=>{window.scrollTo(0, 0)},[])

  const [ aiChatBox,setAiChatBox ] = useState(false)
  const [ codeInput , setCodeInput ] = useState("console.log('Hello,world...')")
  const [ output ,setOutput ] = useState(null)
  
  useEffect(()=>{ 
    setOutput(null)
  },[codeInput])
  
  const handleCodeRun = async () => {
    if (!codeInput.trim()) {
      setOutput("Please enter some code to execute.");
      notifications.show({
        message: 'Please enter some code to execute.',
        withCloseButton: true,
        autoClose: 5000,
        color: 'green',
      });
      return;
    }

    let logs = []; // Capture logs here

    // Overriding console.log temporarily to capture output
    const originalConsoleLog = console.log;
    console.log = (...args) => {
        logs.push(args.join(' '));
        originalConsoleLog(...args); // Preserve the original functionality
    };

    try {
        const result = new Function(`
          "use strict";
          ${codeInput}
        `)();
        setOutput(logs.join('\n') || "No output returned.");
    } catch (error) {
        console.error("Error evaluating codeInput:", error);
        setOutput(`Error: ${error.message}`);
    } finally {
        console.log = originalConsoleLog; // Restore console.log
        // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
};

  console.log(codeInput)
  console.log(output)
  return (
   <>
  <IconArrowLeft className="cursor-pointer opacity-50 hover:opacity-100 text-lightsecondaryClr" onClick={()=>navigate('/')}/>

    <div className='grid lg:grid-cols-2 gap-8 py-6 md:px-4 h-[90vh]'>
      <button onClick={()=>setAiChatBox(true)} className={`bg-secondaryClr bg-opacity-20  border-2 border-primaryClr text-zinc-600  dark:text-white py-2 px-6 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr shadow-md fixed bottom-8 right-12 `}>Ask AI</button>
        <div className='dark:bg-[#1e1e1e] bg-white flex shadow-md flex-col basis-1/2 border-2 border-primaryClr rounded-md  py-4  shadow-sm sm:min-h-[400px] lg:min-h-full overflow-hidden'>
            <p className='sm:text-sm md:text-md font-[700] text-lg opacity-60 px-3 pb-3 shadow-md  uppercase text-black dark:text-white'>javascript Code Editor</p>
            <CodeInput codeInput={codeInput} setCodeInput={setCodeInput}/>
            <button onClick={handleCodeRun} 
             className={`flex gap-2 items-center justify-center ml-auto mr-2 bg-secondaryClr text-textCLr px-6 py-1 min-w-fit rounded-lg  font-bold hover:bg-lightSecondaryClr hover:text-mainClr hover:border-secondaryClr  `}>
               <IconPlayerPlayFilled className='w-4 h-4'/> Run</button>
        </div>
       
        <div className=' flex items-center shadow-md flex-col basis-1/2 border-2 border-primaryClr rounded-md p-4 shadow-sm sm:min-h-[200px] lg:min- h-full'>
            <p className='sm:text-sm md:text-md font-[700] text-lg opacity-60'>Output</p>
            <CodeOuput  output={output}/>
        </div>
       
        { aiChatBox && createPortal(<ChatBox setAiChatBox={setAiChatBox}/>,document.body)}

    </div>
      </>  
  
  )
}

export default LearnWithAI