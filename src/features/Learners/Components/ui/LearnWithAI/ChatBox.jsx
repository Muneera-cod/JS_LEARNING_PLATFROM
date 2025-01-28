import { IconX,IconSend2 } from "@tabler/icons-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Loader } from "@mantine/core";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function ChatBox({ setAiChatBox }) {
  const isDarkmode = useSelector((state)=>state.theme.isDarkmode)
  const [ inputText ,setInputText ] = useState('')
  const [ chatHistory ,setChatHistory ] = useState([])
  const [ loading ,setLoading ] = useState(false)
  const handleSend = async()=> {
     if(!inputText.trim()) return
     setLoading(true)
     try{
      
      const result = await model.generateContent(inputText);
      const aiResponse = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      
      const sections = aiResponse.split("\n\n").map((p) => p.trim()).filter(Boolean);
       setChatHistory((prev) => [
          ...prev,
          { sender: "user", message: inputText },
          ...sections.map((section, index) => ({
            sender: "ai",
            message: section.trim(),
            isHeader: index === 0 // Example: First section could be the 'answer' header
        }))
       ]);
       setInputText(""); 
     }
     catch(error){
      console.error("Error generating response:", error);
     }
     finally {
      setLoading(false);  
    }
  }
  
  return (
  
    <div className={`fixed  top-0 right-0 bottom-0 z-30 flex flex-col justify-start sm:min-w-full  md:min-w-[600px] gap-4 lg:min-w-[720px] border-2 border-primaryClr  p-4 shadow-2xl min-h-screen ${!isDarkmode ? 'bg-mainClr text-textCLr' : 'bg-darkmodeMainClr text-[rgb(255,255,255,0.8)]'}`}>
       <IconX onClick={()=>setAiChatBox(false)} className="dark:text-white mr-auto"/>

            
            <div className='h-[84%] flex flex-col gap-2 overflow-auto px-2' >
            {loading && <Loader className="fixed top-[50%] left-[50%]  -translate-y-1/2 -translate-x-1/2" color="yellow"/>}
            {chatHistory.map((chat, index) => (
                    <div 
                        key={index}
                        className={`px-4 py-2 rounded-lg w-fit max-w-[70%] ${chat.sender === "user" ? 'bg-primaryClr self-end' : 'bg-secondaryClr  bg-opacity-10 self-start'}`}
                    >
                        {chat.message}
                    </div>
                ))}
            </div>
            <div className=" flex items-center bg-primaryClr p-2 px-4 gap-2 rounded-md absolute bottom-4 right-4  left-4 ">
              <input  value={inputText} onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()} className={`p-2  bg-transparent w-full ${loading ? 'opacity-30' : ''}`} placeholder="Type here...."></input>
                {!loading ? <IconSend2 onClick={handleSend} className="w-fit h-fit opacity-50"/> : <IconSend2 className="w-fit h-fit opacity-30"/>}
              </div>
    </div>
   
  )
}

export default ChatBox