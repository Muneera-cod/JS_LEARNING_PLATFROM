import { IconX,IconSend2 } from "@tabler/icons-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function ChatBox({ setAiChatBox }) {
  const isDarkmode = useSelector((state)=>state.theme.isDarkmode)
  const [inputText,setInputText] = useState('')
  const [chatHistory,setChatHistory] = useState([])

  const handleSend = async()=> {
     if(!inputText.trim()) return
     try{
      
      const result = await model.generateContent(inputText);
      const aiResponse = result.response.candidates[0].content.parts[0].text;
      
      // Update chat history with user and AI messages
       setChatHistory((prev) => [
          ...prev,
          { sender: "user", message: inputText },
          { sender: "ai", message: aiResponse }
       ]);
       setInputText(""); // Clear input field after sending
     }
     catch(error){
      console.error("Error generating response:", error);
     }
  }
  return (
  
    <div className={`fixed top-0 right-0 z-30 flex flex-col justify-between sm:min-w-full  md:min-w-[600px] lg:min-w-[720px] border-2 border-primaryClr  p-4 shadow-2xl min-h-screen ${!isDarkmode ? 'bg-mainClr text-textCLr' : 'bg-darkmodeMainClr text-[rgb(255,255,255,0.8)]'}`}>
       <IconX onClick={()=>setAiChatBox(false)} className="dark:text-white mr-auto"/>

            
            <div className='min-h-[500px] flex flex-col gap-2' >

            {chatHistory.map((chat, index) => (
                    <div 
                        key={index}
                        className={`px-4 py-2 rounded-lg w-fit max-w-[70%] ${chat.sender === "user" ? 'bg-primaryClr self-end' : 'bg-secondaryClr bg-opacity-10 self-start'}`}
                    >
                        {chat.message}
                    </div>
                ))}
            </div>
            <div className="w-full flex items-center bg-primaryClr p-2 px-4 gap-2 rounded-md">
              <input  value={inputText} onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()} className="p-2  bg-transparent w-full" placeholder="Type here...."></input>
                <IconSend2 onClick={handleSend} className="w-fit h-fit opacity-50"/>
              </div>
    </div>
   
  )
}

export default ChatBox