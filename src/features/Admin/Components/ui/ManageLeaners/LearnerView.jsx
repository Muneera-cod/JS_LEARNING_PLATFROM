import profilepic from '../../../../../assets/Images/OIP.jpg'
import {
  IconMailFilled,
  IconPhoneFilled,
  IconX,
  IconCalendarMonth,
  IconClockFilled,
  IconTrashFilled,
  IconEditCircle,
} from "@tabler/icons-react";
import { useDeleteLearnerMutation, useFetchLearnerQuery } from '../../../../../redux/Api/LearnerApiSlice';
import { Divider } from "@mantine/core";
import { Loader } from '@mantine/core';
import LearnersProgress from '../../../../Learners/Components/ui/LearnersHome/LearnersProgress';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { useDispatch } from 'react-redux';
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice';
function LearnerView() {
  const { id } = useParams()
  const { data ,isLoading , isError ,error} = useFetchLearnerQuery(id)
  const [ deleteLearner,{isLoading:deleteLoading,isError:deleteError,isSuccess:deleteSuccess} ] = useDeleteLearnerMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(deleteSuccess){
      notifications.show({
        message: 'Deleted Learner Successfully',
        withCloseButton: true,
        autoClose: 5000,
         color: 'green'
      });
      navigate(-1);
  dispatch(setSubView(0))
    } },[deleteSuccess])   
     useEffect(()=>{ if(deleteError){ notifications.show({
      message: 'Failed to delete the learner',
      withCloseButton: true,
      autoClose: 5000,
       color: 'red'
    });}},[deleteError])
  const handleDelete = async () => {
    try {
      await deleteLearner(id).unwrap();
      dispatch(setSubView(0))
      navigate(-1); 
    } catch (err) {
      console.error('Failed to delete the learner:', err);
    }
  };
  if(isLoading || deleteLoading){
      return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
    }
    if(isError){
      return <div className='min-h-[15rem] w-full flex items-center justify-center'>An Error occured {error}</div>
  }
  return (
    <div className="basis-4/12 w-full h-full  text-textCLr dark:text-mainClr px-6 py-8 flex flex-col gap-14">
      <IconX className='w-12 h-12' onClick={()=>navigate(-1)}/>
      <div className="basis-3/12 flex flex-col items-center p-5  gap-2 justify-end">
        <img src={data?.photoURL ? data.photoURL : profilepic} className="w-20 h-20"></img>
        <p className="text-2xl font-semibold">{data?.displayName ? data?.displayName : 'user'}</p>
        
      </div>
      <Divider classNames='text-primaryClr'/>
      <div className="basis-4/12 flex flex-col justify-end items-start">
      
      {/* <p className="text-2xl flex-grow flex justify-end flex-col pb-3  font-semibold">
        Contact Info
      </p> */}

      <div className="gap-5 pt-5 flex-1 flex flex-col  w-full ">
        <div className="flex gap-2 items-center justify-between dark:hover:text-gray-300 hover:text-gray-600">
          <div className='flex items-center gap-2'><IconCalendarMonth />
          <p className="text-sm">Joined date </p></div>
          <p className="text-sm">{data && new Date(data.createdAt.seconds * 1000).toLocaleString().split(',')[0]}</p>
        </div>
        <Divider classNames='text-primaryClr'/>
      </div>

      <div className="gap-5 pt-5 flex-1 flex flex-col w-full ">
        <div className="flex gap-2 items-center justify-between  dark:hover:text-gray-300 hover:text-gray-600">
          
          <div className='flex items-center gap-2'><IconClockFilled />
          <p className="text-sm">Joined time</p></div>
       
          <p className="text-sm">{data && new Date(data.createdAt.seconds * 1000).toLocaleString().split(',')[1]}</p>
        </div>
        <Divider classNames='text-primaryClr'/>
      </div>
     
    </div>
      
      <div className="basis-4/12 flex flex-col justify-end items-start">
      
        <p className="text-2xl flex-grow flex justify-end flex-col pb-3  font-semibold">
          Contact Info
        </p>

        <div className="gap-5 pt-5 flex-1 flex flex-col  w-full">
          <div className="flex gap-2 items-center  dark:hover:text-gray-300 hover:text-gray-600">
            <IconMailFilled />
            <p className="text-sm">{data?.email ? data?.email : 'not added'}</p>
          </div>
          <Divider classNames='text-primaryClr'/>
        </div>

        <div className="gap-5 pt-5 flex-1 flex flex-col w-full ">
          <div className="flex gap-2 items-center  dark:hover:text-gray-300 hover:text-gray-600">
            <IconPhoneFilled />
            <p className="text-sm">{data?.phoneNumber ? data?.phoneNumber : 'Not added'}</p>
          </div>
          <Divider classNames='text-primaryClr'/>
        </div>
       
      </div>
      <div className="basis-5/12 flex flex-col gap-5">
       <LearnersProgress id={id}/>
        {/* <div className="basis-1/3 flex gap-5">
          <div className="basis-1/2  border-2 border-primaryClr p-3">
          </div>
          <div className="basis-1/2 border-2 border-gray-50 p-3">
          </div>
        </div> */}
      </div>
      <div className="flex font-[700] px-4  gap-2 items-center justify-between text-green-800 dark:text-green-300 dark:hover:text-green-500 hover:text-green-600">
         <p className="text-sm">Update Account</p><IconEditCircle  className='cursor-pointer'/>
        </div>
        <div className="flex font-[700] px-4  gap-2 items-center justify-between text-red-800 dark:hover:text-red-300 hover:text-red-500">
         <p className="text-sm">Delete Account</p><IconTrashFilled 
        //  onClick={handleDelete}    
          className='cursor-pointer'/>
          
        </div>
        
    </div>
  )
}

export default LearnerView