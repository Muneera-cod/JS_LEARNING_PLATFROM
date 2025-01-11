import {useState,useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice'
import { USER_REGEX,PWD_REGEX,EMAIL_REGEX } from '../../../../../Components/ui/Form/Regex'
import { useAddLearnerMutation } from '../../../../../redux/Api/LearnerApiSlice'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css';
function AddNewLearner() {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [ addLearner,{isLoading,isError,isSuccess} ] = useAddLearnerMutation()
    const errorref=useRef()
    const userRef=useRef()
    const [name,setName]=useState('')
    const [validname,setValidName]=useState(false)
    const [email,SetEmail]=useState('')
    const [validEmail,setValidEmail]=useState(false)
    const [pwd,SetPwd]=useState('')
    const [validPwd,setValidPwd]=useState(false)
   const [confirmPwd,setConfirmPwd]=useState('')
   const [validConfirmPwd,setValidConfirmPwd]=useState(false)
   const [errorMsg,setErrorMsg]=useState('')
  useEffect(()=>{setValidName(USER_REGEX.test(name))},[name])
  useEffect(()=>{setValidEmail(EMAIL_REGEX.test(email))},[email])
  useEffect(()=>{
      setValidPwd(PWD_REGEX.test(pwd))
      setValidConfirmPwd(pwd===confirmPwd)
   },[pwd,confirmPwd])
   useEffect(()=>{
    if(isSuccess){
      notifications.show({
        message: 'New learner added',
        withCloseButton: true,
        autoClose: 5000,
         color: 'green'
      });
    } },[isSuccess]
  )
   useEffect(() =>{userRef.current.focus()}, [])
   useEffect(()=>{setErrorMsg('')},[name,email,pwd,confirmPwd])
    const handleSubmit=async(e)=>{
      e.preventDefault()
      if(name==='' || email==='' || pwd==='' || confirmPwd===''){
        setErrorMsg('Please fill all the fields')
        errorref.current.focus();
        return
      }
      if(!validname || !validEmail || !validPwd || !validConfirmPwd){
        setErrorMsg('Please fill the fields correctly')
        errorref.current.focus();
        return
      }
      try{
        const res = await addLearner({email:email,password:pwd})
        setName('')
        SetEmail('')
        SetPwd('')
        setConfirmPwd('')
        setErrorMsg('')
       
        console.log(res)
      }
      catch(err){
        console.log('Error',err)
        notifications.show({
          message: 'An error ocurred',
          withCloseButton: true,
          autoClose: 5000,
           color: 'red'
        });
        setErrorMsg(err.message)
        errorref.current.focus()
      }
      }
    console.log('Yop',name,email,pwd,confirmPwd)
  return (
    <>
    <p className='flex  items-center p-2 opacity-50 hover:opacity-90' onClick={()=>{dispatch(setSubView(0));navigate(-1)}}>Back</p>
    <div className='flex flex-col border-2 border-primaryClr sm:p-10 md:p-20 shadow-lg min-h-screen'>
  <p ref={errorref} className={`${errorMsg?'text-red-800 bg-red-100  flex items-center justify-center mt-4  p-2 rounded-md':'absolute left-[-10000px] top-[-10000px]'}`} aria-live="assertive">{errorMsg}</p>
         <form  className='flex flex-col gap-12 w-full' onSubmit={handleSubmit}>
         <fieldset className='flex flex-col gap-8 py-2 justify-center'>
         <label htmlFor='name' className='flex flex-col gap-1  text-sm font-mono ' ref={userRef}>
             Name
             <input onChange={(e)=>setName(e.target.value)}  aria-describedby='namenote' aria-invalid={!validname} aria-label='name' required aria-required='true'
                 placeholder="Enter your name." id="name" value={name} name="name" type='text' className='text-black bg-lightBgclr font-semibold rounded-md border-[3px] border-primaryClr p-3'></input>
             <p id='namenote' className={`${ name && !validname ?'text-[14px]':'hidden'} text-[14px] text-red-800`} aria-live='polite'>{!USER_REGEX.test(name)?'Name should be atleast 3 characters':''}</p>
           </label>  
           <label htmlFor='email' className='flex flex-col gap-1  text-sm font-mono '>
             Email
             <input onChange={(e)=>SetEmail(e.target.value)} aria-describedby='emailnote' aria-invalid={!validEmail} aria-label='email' required aria-required='true'
               placeholder="Enter your email address" id="email" value={email} name="email" type='email' className='text-black bg-lightBgclr font-semibold rounded-md border-[3px] border-primaryClr p-3'></input>
              <p id='emailnote' className={`${ email && !validEmail ?'text-[14px]':'hidden'} text-[14px] text-red-800`} aria-live='polite'>{!EMAIL_REGEX.test(email)?'Email should be valid':''}</p>
           </label>
           <label htmlFor='password' className='flex flex-col gap-1  text-sm font-mono ' >
             Password
             <input onChange={(e)=>SetPwd(e.target.value)}  value={pwd} aria-describedby='pwdnote' aria-invalid={!validPwd} aria-label='password' required 
             placeholder="Enter your password" type='password' id='password' name='password' className='text-black bg-lightBgclr font-semibold rounded-md border-[3px] border-primaryClr p-3'  ></input>
             <p id='pwdnote' className={`${ pwd && !validPwd ?'text-[14px]':'hidden'} text-[14px] text-red-800`} aria-live='polite'>{!PWD_REGEX.test(pwd)?'Password should be atleast 8 characters':''}</p>
           </label>
           <label htmlFor='confirm_pwd' className='flex flex-col gap-1  text-sm font-mono ' >
             Re-Enter Password
             <input onChange={(e)=>setConfirmPwd(e.target.value)} value={confirmPwd} aria-describedby='confirmpwdnote' aria-invalid={!validConfirmPwd} aria-label='confirm_pwd' required aria-required='true'
               placeholder="Enter your password" type='password' id='confirm_pwd' name='confirm_pwd' className='text-black bg-lightBgclr font-semibold rounded-md border-[3px] border-primaryClr p-3'  ></input>
             <p id='confirmpwdnote' className={`${ confirmPwd && !validConfirmPwd ?'text-[14px]':'hidden'} text-[14px] text-red-800`} aria-live='polite'>{confirmPwd!==pwd?'Password does not match':''}</p>
           </label>
         </fieldset>
         <div className='flex items-center w-full justify-center'> 
           <button disabled={true} type='submit' className={`bg-secondaryClr  border-2 border-primaryClr text-mainClr px-4 py-2 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr ${ isLoading? 'opacity-50' :''}`}>Add</button>
         </div> 
         </form></div>
         </>
  )
}
export default AddNewLearner