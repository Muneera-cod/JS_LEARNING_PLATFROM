import  { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../redux/Api/authApiSlice'
function LoginForm({setCurrForm}) {
  const click=()=>{
    setCurrForm(1)
  }
  const [loginUser,{isLoading,isError,isSuccess,error}] = useLoginMutation()
  const navigate=useNavigate()
  const [email,SetEmail]=useState('')

  const [pwd,SetPwd]=useState('')
  const [errorMsg,setErrorMsg]=useState('')
 
 const errorref=useRef()

 useEffect(()=>{setErrorMsg('');},[email,pwd])
const handleSubmit=async(e)=>{
   e.preventDefault();
   if(email.trim() === '' || pwd === ''){
    setErrorMsg('Please fill all the fields')
    if(errorref.current) errorref.current.focus();
    return
  }
  console.log('email',email)
  try{
      const result=await loginUser({email,password:pwd}).unwrap()
     SetEmail(''); SetPwd(''); ; setErrorMsg(''); 
      navigate('/')
     console.log("role inside try",result.role)
    }
  catch(err){
    console.log('error',err)
    setErrorMsg(err.message || 'Invalid Email or Password')
    if ( errorref.current ) { errorref.current.focus(); }
  }  

}
console.log('errorMsg',errorMsg)

 
  return (
    <div className=' text-lightmodeTextClr dark:text-darkmodeTextClr flex flex-col border-2 border-primaryClr sm:p-[32px] md:p-[36px] sm:min-w-full  md:min-w-[500px]  max-h-[550px] min-h-[550px] rounded-l-md shadow-lg '>
      <h3 className='font-bold text-secondaryClr sm:text-xl md:text-2xl font-sans'>Login here....</h3>
     <p ref={errorref} className={`${errorMsg ? 'text-red-800 bg-red-100  flex items-center justify-center mt-4 p-3 rounded-md':'hidden'}`} aria-live="assertive">{  errorMsg }</p>
      <div className='flex text-textCLr  min-h-fit flex-col sm:p-0 md:p-2 lg:p-4 rounded-lg gap-10 items-center justify-center'>
        
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
        <fieldset className='flex flex-col gap-2 py-4  '>
        
          <label className='flex flex-col gap-1  text-sm  text-textCLr dark:text-darkmodeTextClr' htmlFor='email'>
            Email
            <input   placeholder="Enter your email address" id='email' onChange={(e)=>SetEmail(e.target.value)}  value={email} type='text' className='bg-primaryClr  font-semibold rounded-md border-[3px] border-primaryClr p-3'></input>
           
          </label>
          
          <label className='flex flex-col gap-1  text-sm text-textCLr dark:text-darkmodeTextClr'  htmlFor='password'>
            Password
            <input placeholder="Enter your password" type='password' id='password' onChange={(e)=>SetPwd(e.target.value)} value={pwd} className='bg-primaryClr font-semibold rounded-md border-[3px] border-primaryClr p-3'  ></input>
         
          </label>
        </fieldset>
        <div className='flex items-center w-full justify-center'> 
          <button disabled={isLoading} className={`bg-secondaryClr  border-2 border-primaryClr text-mainClr px-4 py-2 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr ${!isLoading ?'':'opacity-30'} `}>{ isLoading ? 'Logging...' :'Login'}</button>
        </div>
          
        </form>
        <div className='flex flex-col gap-4 items-center'>
        <p onClick={()=>setCurrForm(2)} className=' text-mainTextclr dark:text-darkmodeTextClr  dark:hover:text-[#f8e1b9]  sm:text-[13px] md:text-[14px] hover:text-[#f8e1b9] sm:inline'>
          Forgot password...?
           
            </p>
        <p className='  w-fit  text-mainTextclr dark:text-darkmodeTextClr  dark:hover:text-[#f8e1b9]  sm:text-[13px] md:text-[14px]  hover:text-[#f8e1b9] sm:inline'>
          Not joined to learn javaScript?...
            {/* <Link to={'/'}> */}
            <span style={{fontStyle:'italic',display:'inline'}} className='hover:text-[#8b5e0c]' onClick={click} >SignUp</span>
            {/* </Link> */}
            </p>
          </div>  
      </div>
    </div>
  )
}

export default LoginForm