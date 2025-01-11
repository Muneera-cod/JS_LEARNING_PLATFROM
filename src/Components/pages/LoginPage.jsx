import {useState} from 'react'
import FormBanner from '../ui/Form/FormBanner'
import LoginForm from '../ui/Form/LoginForm'
import SignUpForm from '../ui/Form/SignUpForm'
import ForgotPasswordForm from '../ui/Form/ForgotPasswordForm'
function LoginPage() {
      const [currform,setCurrForm]=useState(0)
      
  return (
    
    <div className=' flex bg-mainClr dark:bg-darkmodeMainClr min-h-screen items-center justify-center flex-row sm:p-6 md:p-12 lg:p-16 xl:p-20'>
      
        {currform===0 && <div className='flex w-full items-center justify-center'><LoginForm  currform={currform} setCurrForm={setCurrForm} />
        <FormBanner borderRadius={'r'}/></div>}
        
        {currform===1 && <div className='flex w-full items-center justify-center'><FormBanner  borderRadius={'l'}/><SignUpForm setCurrForm={setCurrForm}/></div>}
        { currform===2 && <div className='flex w-full items-center justify-center'><ForgotPasswordForm  currform={currform} setCurrForm={setCurrForm} /></div>}
    </div>
  )
}

export default LoginPage