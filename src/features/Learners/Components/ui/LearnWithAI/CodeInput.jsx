import Editor from "@monaco-editor/react"
import { useSelector } from "react-redux";

function CodeInput({ codeInput , setCodeInput }) {
  const isDarkmode = useSelector((state)=>state.theme.isDarkmode)

  return (
    <Editor
    value={codeInput} 
    onChange={(value) => setCodeInput(value || "")} 
    height="60vh"
    defaultLanguage="javascript"
     theme={`${isDarkmode ? 'vs-dark' :'vs-light'}`}
/>
  )
}

export default CodeInput