import { useParams } from "react-router-dom"
import { useFetchSingleQuestionQuery } from "../../../../../redux/Api/QuestionApiSlice";
import { Loader } from "@mantine/core";
import { useState,useEffect } from "react";
import Editor from '@monaco-editor/react';
import ViewQuestion from "./ViewQuestion";
import { useSelector } from "react-redux";
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css';
import { createPortal } from "react-dom";
import PassedPopUp from "./PassedPopUp";
import { useStoreUserProgressMutation } from "../../../../../redux/Api/UserProgressApiSlice";
import { auth } from "../../../../../utils/config/firebaseConfig";
function CodeEditor() {
    const isDarkmode=useSelector((state)=>state.theme.isDarkmode)
    const { question_id } = useParams()
    const { data ,isLoading,isError } = useFetchSingleQuestionQuery(question_id)
    const [ storeUserProgress,{ isLoading: storingg, isSuccess: stored , isError: failed} ] = useStoreUserProgressMutation()
    const user = auth.currentUser
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [testCases,setTestCases] = useState([]);
    const [popUp,setPopUp] = useState(false)
    useEffect(() => {
        if (data) {
            const parsedTestCases = data.textCases.map(testCase => ({
                input: typeof parseValue(testCase.input) !== 'object' ? parseValue(testCase.input) : testCase.input,
                expected: typeof parseValue(testCase.output) !== 'object' ? parseValue(testCase.output) : testCase.output
              }));
              setTestCases(parsedTestCases);
        }
      }, [data]);
      
      const parseValue = (value) => {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      };
    
    console.log(testCases)
    console.log(output)
    const handleRun = async() => {
        try {
            const userFunction = new Function(`return ${code}`)();           
            const results = testCases.map(({ input, expected }) => {
             const result = userFunction(input);
             console.log('result',result);console.log('expected',expected)
          //  console.log('stringfy',JSON.stringify(result),expected)
                return {
                    input,
                    expected,
                    result,
                    pass: (typeof(result) !== 'object'  ? result : JSON.stringify(result)) === expected,
                };
            });
            if(results.filter((result)=>result.pass).length === results.length)   {
               await storeUserProgress({ uid: user?.uid ,progressData: { questionid: question_id , status: 'compteled'  }})  
              notifications.show({
                message: `ALL TESTCASEPASSED`,
                withCloseButton: true,
                autoClose: 5000,
                 color: 'green'
              }) 
              setPopUp(true)
            } 
            else{
              notifications.show({
                message: `TESTCASE FAILED...TRY AGAIN`,
                withCloseButton: true,
                autoClose: 5000,
                 color: 'red'
              }) 
            }
            setOutput(JSON.stringify(results, null, 2));
        } catch (error) {
           notifications.show({
            message: `${error.message} or if there is command at top of code  please remove`,
            withCloseButton: true,
            autoClose: 5000,
             color: 'red'
          }) 
            setOutput(`Error: ${error.message}`);
            
        }
        finally{
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
          
        }
    };
  
    if(isLoading || storingg){
      return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
    }
    if(isError || failed){
      return <div className='min-h-[40rem] w-full flex items-center justify-center'>An Error occured</div>
    }
    return (
        <>
    <div className="flex sm:flex-col lg:flex-row gap-4 bg-primaryClr p-6 -m-6">
        {/* Left Section */}
        <div className="flex-1 basis-1/2 ">
            <ViewQuestion 
            category={data?.category} level={data?.level}
             title={data?.title} explanation={data?.explanation} 
             steps={data?.steps} textCases={data?.textCases}
             id={question_id}
             />
        </div>
        {/* Right Section */}
        <div className="basis-1/2 py-4">
            <div className="h-1/2 ">
              
                <Editor
                    value={code} 
                    onChange={(value) => setCode(value || "")} 
                    height="60vh"
                    defaultLanguage="javascript"
                     theme={`${isDarkmode ? 'vs-dark' :'vs-light'}`}
                />
                 <button 
                 onClick={handleRun} 
                 className={`w-1/4  mx-4 my-10  bg-secondaryClr  border-2 border-primaryClr text-mainClr px-3 py-2 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr  `}>
                Run Code
               </button>

            <div  className="bg-primaryClr p-4 rounded-md">
                <h4>Output</h4>
                <pre>{output}</pre>
            </div> 
        </div>
        </div>

    </div>
    { popUp && createPortal(<PassedPopUp setPopUp={setPopUp}/>,document.body)}
    </>
    )
}

export default CodeEditor