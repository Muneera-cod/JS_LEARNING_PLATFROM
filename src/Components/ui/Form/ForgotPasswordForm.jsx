import {useState} from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../utils/config/firebaseConfig'
import { verifyEmail } from '../../../auth/VerifyEmail'
function ForgotPasswordForm({setCurrForm}) {
    const [email,setEmail]=useState('')
    const [message,SetMessage]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email)
            SetMessage('Check your email for further instructions')
        } catch (error) {
            SetMessage(error.message)
        }
    }
    //  const handleVerifyEmail = async () => {
    //         const result = await verifyEmail(auth.currentUser);
    //         if (result.message) {
    //           alert(result.message);
    //         } else if (result.error) {
    //           alert('Error: ' + result.error);
    //         }
    //       };
  return (
    <>
    <button onClick={()=>setCurrForm(0)} className='basis-1/6 absolute sm:top-6 md:top-10 sm:left-6 md:left-10  opacity-50 hover:opacity-100 text-lightsecondaryClr dark:text-secondaryClr'>back</button>
    
    <div className='flex flex-col sm:basis-full md:basis-3/4 lg:basis-1/2 xl:basis-1/3 justify-center sm:px-0 md:px-2  dark:text-darkmodeTextClr text-textCLr  font-sans'>
 
    <h2 className='font-bold text-md mx-2'>Forgot Password</h2>
    <form onSubmit={handleSubmit} className='flex  min-h-fit flex-col md:px-2 py-4 rounded-lg gap-4  items-center justify-center'>
      <input className='bg-lightBgclr font-semibold w-full rounded-md border-[3px] border-markclr text-black p-3 hover:border-markHoverclr'
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className='bg-secondaryClr  border-2 border-primaryClr text-mainClr px-4 py-2 min-w-fit rounded-lg  font-mono text-sm font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr'>Reset Password</button>
    </form>
    {message && <p className='text-secondaryClr font-[700]'>{message}</p>}
    {/* <p className='text-mainTextclr dark:text-darkmodeTextClr  dark:hover:text-[#f8e1b9] p-4 text-[14px] hover:text-[#f8e1b9]'>If your email is not verified...<span className='hover:text-[#8b5e0c]' >Click here to Verify  email...</span></p> */}
  </div>
  </>
  )
}

export default ForgotPasswordForm