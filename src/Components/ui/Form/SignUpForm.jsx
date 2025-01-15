import { useState,useRef, useEffect } from 'react'
import { USER_REGEX,EMAIL_REGEX,PWD_REGEX } from './Regex'
import { useSignUpMutation } from '../../../redux/Api/authApiSlice'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css';

function SignUpForm({setCurrForm}) {
    const click=()=>{
        setCurrForm(0)
    }
 
  const [signUpUser,{isLoading,isError,isSuccess}] = useSignUpMutation()
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
  useEffect(()=>{
       if(isSuccess){
         notifications.show({
           message: 'Signed Up successfully',
           withCloseButton: true,
           autoClose: 5000,
            color: 'green'
         });
         
       } },[isSuccess])

useEffect(()=>{setValidName(USER_REGEX.test(name))},[name])
useEffect(()=>{setValidEmail(EMAIL_REGEX.test(email))},[email])
useEffect(()=>{
    setValidPwd(PWD_REGEX.test(pwd))
    setValidConfirmPwd(pwd===confirmPwd)
 },[pwd,confirmPwd])
 
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
      const res=await signUpUser({email,password:pwd,displayName:name})
      setName('')
      SetEmail('')
      SetPwd('')
      setConfirmPwd('')
      setErrorMsg('')
      
      console.log(res)
    }
    catch(err){
      console.log('Error',err)
      setErrorMsg(err.message)
      errorref.current.focus()
      notifications.show({
        message: 'An error ocurred',
        withCloseButton: true,
        autoClose: 5000,
         color: 'red'
      });
    }
    }
  console.log('Yop',name,email,pwd,confirmPwd)
  
  
  return (
    <div className='flex flex-col border-2 border-primaryClr sm:p-[36px] md:p-[30px] sm:min-w-full md:min-w-[500px]  max-h-[592px] min-h-[592px] rounded-r-md shadow-lg '>
     <div className='font-bold text-secondaryClr text-2xl font-sans'>SignUp here....</div>
   
     <p ref={errorref} className={`${errorMsg?'text-red-800 bg-red-100 opacity-10  flex items-center justify-center mt-4  p-2 rounded-md':'absolute left-[-10000px] top-[-10000px]'}`} aria-live="assertive">{errorMsg}</p>
      <div className='flex text-textCLr text-darkmodeTextClr  min-h-fit flex-col  sm:py-0 md:py-2 lg:py-4 sm:px-0 md:px-4 lg:px-8 xl:px-10 rounded-lg max-gap-16 items-center justify-center'>
      
       <form  className='w-full' onSubmit={handleSubmit}>
         <fieldset className='flex flex-col gap-2 py-2 justify-center'>

           <label htmlFor='name' className='flex flex-col gap-1  text-sm  text-textCLr dark:text-darkmodeTextClr' ref={userRef}>
              Name
             <input onChange={(e)=>setName(e.target.value)}  aria-describedby='namenote' aria-invalid={!validname} aria-label='name' required aria-required='true'
              placeholder="Enter your name." id="name" value={name} name="name" type='text' className='text-black bg-lightBgclr font-semibold rounded-md border-[3px] border-primaryClr p-3'></input>
             <p id='namenote' className={`${ name && !validname ?'text-[14px]':'hidden'} text-[14px] text-red-800`} aria-live='polite'>{!USER_REGEX.test(name)?'Name should be atleast 3 characters':''}</p>
           </label>  
           <label htmlFor='email' className='flex flex-col gap-1  text-sm text-textCLr dark:text-darkmodeTextClr'>
              Email
             <input onChange={(e)=>SetEmail(e.target.value)} aria-describedby='emailnote' aria-invalid={!validEmail} aria-label='email' required aria-required='true'
             placeholder="Enter your email address" id="email" value={email} name="email" type='email' className='text-black bg-lightBgclr font-semibold rounded-md border-[3px] border-primaryClr p-3'></input>
             <p id='emailnote' className={`${ email && !validEmail ?'text-[14px]':'hidden'} text-[14px] text-red-800`} aria-live='polite'>{!EMAIL_REGEX.test(email)?'Email should be valid':''}</p>
           </label>
        
           <label htmlFor='password' className='flex flex-col gap-1  text-sm text-textCLr dark:text-darkmodeTextClr' >
              Password
             <input onChange={(e)=>SetPwd(e.target.value)}  value={pwd} aria-describedby='pwdnote' aria-invalid={!validPwd} aria-label='password' required 
              placeholder="Enter your password" type='password' id='password' name='password' className='text-black bg-lightBgclr font-semibold rounded-md border-[3px] border-primaryClr p-3'  ></input>
              <p id='pwdnote' className={`${ pwd && !validPwd ?'text-[14px]':'hidden'} text-[14px] text-red-800`} aria-live='polite'>{!PWD_REGEX.test(pwd)?'Password should be atleast 6 characters':''}</p>
           </label>
           <label htmlFor='confirm_pwd' className='flex flex-col gap-1  text-sm text-textCLr dark:text-darkmodeTextClr' >
               Re-Enter Password
               <input onChange={(e)=>setConfirmPwd(e.target.value)} value={confirmPwd} aria-describedby='confirmpwdnote' aria-invalid={!validConfirmPwd} aria-label='confirm_pwd' required aria-required='true'
               placeholder="Enter your password" type='password' id='confirm_pwd' name='confirm_pwd' className='text-black bg-lightBgclr font-semibold rounded-md border-[3px] border-primaryClr p-3'  ></input>
               <p id='confirmpwdnote' className={`${ confirmPwd && !validConfirmPwd ?'text-[14px]':'hidden'} text-[14px] text-red-800`} aria-live='polite'>{confirmPwd!==pwd?'Password does not match':''}</p>
           </label>
         </fieldset>
         <div className='flex items-center w-full justify-center'> 
              <button disabled={isLoading} type='submit' className={`bg-secondaryClr  border-2 border-primaryClr text-mainClr p-3 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr ${!isLoading ?'':'opacity-30'} `}>{ isLoading ? 'Signing...' : 'SignUp' }</button>
         </div>
        
       </form>
       <div className='flex  w-fit justify-center text-mainTextclr dark:text-darkmodeTextClr px-4  py-2 text-[14px] hover:text-[#f8e1b9] sm:inline m-auto'>Already have aaccount?...
          {/* <Link to={'/'}> */}
          <span style={{fontStyle:'italic',display:'inline'}} className='hover:text-[#8b5e0c]' onClick={click}>SignIn</span>
          {/* </Link> */}
       </div>
    </div>
  </div>
  )
}

export default SignUpForm