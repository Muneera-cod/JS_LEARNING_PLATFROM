import profilepic from '../../../../../assets/Images/OIP.jpg'
import {
  IconMailFilled,
  IconPhoneFilled,
  IconX,
} from "@tabler/icons-react";
import { useFetchLearnerQuery } from '../../../../../redux/Api/LearnerApiSlice';
import { Divider } from "@mantine/core";
import { Loader } from '@mantine/core';
import LearnersProgress from '../../../../Learners/Components/ui/LearnersHome/LearnersProgress';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function LearnerView() {
  const { learner_id } = useParams()
  const { data ,isLoading , isError ,error} = useFetchLearnerQuery(learner_id)
  const navigate = useNavigate()
  if(isLoading){
      return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
    }
    if(isError){
      return <div className='min-h-[15rem] w-full flex items-center justify-center'>An Error occured{error}</div>
  }
  return (
    <div className="basis-4/12 w-full h-full bg-white px-6 py-8 flex flex-col gap-14">
      <IconX className='w-8 h-8' onClick={()=>navigate(-1)}/>
      <div className="basis-3/12 flex flex-col items-center p-5  gap-2 justify-end">
        <img src={data?.photoURL ? data.photoURL : profilepic} className="w-20 h-20"></img>
        <p className="text-2xl text-gray-600 font-semibold">{data?.displayName ? data?.displayName : 'user'}</p>
        
      </div>
      <Divider />
      <div className="basis-4/12 flex flex-col justify-end items-start">
        <p className="text-2xl flex-grow flex justify-end flex-col pb-3 text-gray-600 font-semibold">
          Contact Info
        </p>

        <div className="gap-5 pt-5 flex-1 flex flex-col  w-full">
          <div className="flex gap-2 items-center text-gray-400 hover:text-gray-600">
            <IconMailFilled />
            <p className="text-sm">{data?.email ? data?.email : 'not added'}</p>
          </div>
          <Divider />
        </div>

        <div className="gap-5 pt-5 flex-1 flex flex-col w-full ">
          <div className="flex gap-2 items-center text-gray-400 hover:text-gray-600">
            <IconPhoneFilled />
            <p className="text-sm">{data?.phoneNumber ? data?.phoneNumber : 'Not added'}</p>
          </div>
          <Divider />
        </div>
       
      </div>
      <div className="basis-5/12 flex flex-col gap-5">
       <LearnersProgress id={learner_id}/>
        <div className="basis-1/3 flex gap-5">
          <div className="basis-1/2  border-2 border-gray-50 p-3">
            {/* <CircularProgressbar value={percentage} text={`${percentage}%`} /> */}
          </div>
          <div className="basis-1/2 border-2 border-gray-50 p-3">
            {/* <CircularProgressbar value={percentage} text={`${percentage}%`} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnerView