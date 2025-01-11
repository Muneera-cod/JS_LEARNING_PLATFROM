import React, { useState } from 'react'
import LoginForm from '../../../../Components/ui/Form/LoginForm'

// import SignUpForm from '../../Components/Form/SignUpForm'
import FormBanner from '../../../../Components/ui/Form/FormBanner'
function AdminLogin() {
  // const [currform,setCurrForm]=useState(0)
 
  return (

    <section className=' flex bg-mainClr dark:bg-darkmodeMainClr min-h-screen items-center justify-center flex-row sm:p-6 md:p-12 lg:p-16 xl:p-20'>
      <div className='flex w-full items-center justify-center'><LoginForm />
      <FormBanner/></div>
      
        {/* {currform===0 && <div className='flex w-full items-center justify-center'><LoginForm setCurrForm={setCurrForm}/>
        <FormBanner/></div>} */}
        
        {/* {currform===1 && <div className='flex '><FormBanner/><SignUpForm setCurrForm={setCurrForm}/></div>} */}
    </section>
  )
}

export default AdminLogin