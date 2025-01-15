import { IconX } from '@tabler/icons-react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {  useUpdateProfileMutation } from '../../../redux/Api/authApiSlice'
import { notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';
import '@mantine/notifications/styles.css';
function UpdateProfile({setPopUp}) {
    const isDarkmode=useSelector((state)=>state.theme.isDarkmode)
    const [ updateProfile , { isError , isLoading , isSuccess }] = useUpdateProfileMutation()
    const [name,setName]=useState('')
    const [photo,setPhoto]=useState('')
    // const [email,setEmail]=useState('')
    // const [password,setPassword] = useState('')
    useEffect(()=>{
        if(isSuccess){
            notifications.show({
                message: 'Profile updated successfully',
                withCloseButton: true,
                autoClose: 5000,
                 color:'green'
              });
          
        } },[isSuccess])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(name.trim() === '' && photo === ''){
            alert('Please fill the fields')
            return
        }
        try{
            const updateData = {};
            if (name) updateData.displayName = name;
            if (photo) updateData.photoURL = photo;
            const res = await updateProfile( updateData )
            setName('')
            alert('Updated successfully')
           
        }catch(err){
            console.log(err)
            notifications.show({
                message: 'An error ocurred',
                withCloseButton: true,
                autoClose: 5000,
                 color: 'red'
              });
        }   
    }
//   const handleEmailSubmit=async(e)=>{
//        e.preventDefault()
//        if(email.trim()===''){
//         alert('Please fill the field')
//         return
//     }
//     try{
     
//     }
//     catch(error){
     
//     }
//   }
  if( isLoading ){
            return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
  }
  return (
    <div className={`fixed z-10 top-[50%] left-[50%]  -translate-y-1/2 -translate-x-1/2 shadow-xl border-[0.5px] border-primaryClr text-black rounded-xl flex flex-col sm:min-w-[380px] md:min-w-[600px] sm:max-w-[600px] md:max-w-[800px] px-[50px]  py-[50px] items-center gap-[40px]  ${isDarkmode ? 'bg-darkmodeMainClr text-darkmodeTextClr' : 'bg-mainClr text-lightmodeTextClr'}`}>
        <IconX onClick={()=>{setPopUp(false)}} className={`ml-auto w-[1.5rem] h-[1.5rem]  opacity-50 -mt-4 -mr-4 ${ isDarkmode ? 'text-white': 'text-black'}`}/>
    <div className='flex flex-col gap-[20px]  w-full h-full items-start '>
      <form onSubmit={handleSubmit} className='flex flex-col  gap-[30px] w-full'>
          <div className='flex flex-col gap-[5px]' >
             <label className='text-md opacity-80 font-[700] '>Currently not able to upload photo</label>
             <input type='file' onChange={(e)=>{
                 const file = e.target.files[0]; 
                 if (file) {
                     setPhoto(file); 
             }}} value={photo} disabled={true} placeholder='currently not able to upload photo'></input>
          </div>
             <input onChange={(e)=>setName(e.target.value)} value={name}  type='text' className='p-3 border-b-2 border-primaryClr bg-primaryClr rounded-md w-full' placeholder='Enter the name'></input>
    
          <button disabled={isLoading} className={`bg-secondaryClr  border-2 border-primaryClr text-mainClr p-2 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr ${ !isLoading ? '' : 'opacity-50'}`}>Update</button>
      </form>
     
    </div>
    {/* <div className='flex flex-col gap-[20px]  w-full h-full items-start '>
      <form className='flex flex-col  gap-[20px] w-full'>
          <p className='text-sm opacity-50 font-[700]'>Want to update your current email...?</p>
             <input onChange={(e)=>setEmail(e.target.value)} type='email' value={email} className=' bg-primaryClr p-3  border-b-2 border-primaryClr rounded-md w-full' placeholder='Enter the email'></input>
             <input onChange={(e)=>setPassword(e.target.value)} type='password' value={password} className=' bg-primaryClr p-3  border-b-2 border-primaryClr rounded-md w-full' placeholder='Enter your password'></input>

          <button  className={`bg-secondaryClr  border-2 border-primaryClr text-mainClr p-2 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr `}>Update Email</button>
      </form>
     
    </div> */}
 </div>
  )
}

export default UpdateProfile