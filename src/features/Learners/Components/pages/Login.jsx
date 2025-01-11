import React, { useState } from 'react'
import LoginForm from '../../../../Components/ui/Form/LoginForm'
import SignUpForm from '../../../../Components/ui/Form/SignUpForm'
import FormBanner from '../../../../Components/ui/Form/FormBanner'
function Login() {
  const [currform,setCurrForm]=useState(0)
 
  return (

    <div className=' flex bg-mainClr   min-h-screen items-center justify-center flex-row sm:p-6 md:p-12 lg:p-16 xl:p-20'>
      jhofh
        {currform===0 && <div className='flex w-full items-center justify-center'><LoginForm  currform={currform} setCurrForm={setCurrForm}/>
        <FormBanner/></div>}
        
        {currform===1 && <div className='flex w-full items-center justify-center'><FormBanner/><SignUpForm setCurrForm={setCurrForm}/></div>}
    </div>
  )
}

export default Login