import Editor from "@monaco-editor/react"
import { useSelector } from "react-redux";

function CodeInput({ codeInput , setCodeInput }) {
  const isDarkmode = useSelector((state)=>state.theme.isDarkmode)

  return (
    <div className="w-full h-full bg-white flex items-center justify-center rounded-md dark:bg-[#1e1e1e]">
    <Editor
    value={codeInput} 
    onChange={(value) => setCodeInput(value || "")} 
    height="60vh"
    defaultLanguage="javascript"
     theme={`${isDarkmode ? 'vs-dark' :'vs-light'}`}
     />
   </div>
  )
}

export default CodeInput