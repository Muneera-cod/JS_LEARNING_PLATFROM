import SeachBar from '../../../../../Components/ui/SeachBar'
import { useState } from 'react'
import {  Loader,Select } from '@mantine/core'
import { IconMoodEmpty } from '@tabler/icons-react'
import { useFetchQuestionsQuery } from '../../../../../redux/Api/QuestionApiSlice'
import QuestionContainerLearner from '../../ui/Questions/QuestionContainerLearner'
import { Outlet } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice'
import { useNavigate } from 'react-router-dom'
function Questions() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data , isLoading ,isError} = useFetchQuestionsQuery()
  const subview = useSelector((state)=>state.view.curSubView)
  const [searchValue,setSearchVvalue] = useState('')
  const [selectedLevel,setSelectedLevel] = useState('')
  const [solved,setSolved] = useState(false)
  const [unSolved,setUnSolved] = useState(false)
  const [solvedArray,setSolvedArray] = useState([])
  console.log('solved',solvedArray)
  const filteredData = data ? data.filter((question) => {
      const matchesLevel = selectedLevel ? question.level.toLowerCase() === selectedLevel.toLowerCase() : true;
      const matchesSearch = searchValue ? question.title.toLowerCase().includes(searchValue.toLowerCase()) : true;
      const matchSolveUnsolve = ( ( solved && unSolved )  || ( !solved && !unSolved ) ) ? true : ( (solved && !unSolved) ? solvedArray.some((id)=> id === question.id) : solvedArray.every((x)=>x !== question.id) )
      return matchesLevel && matchesSearch && matchSolveUnsolve;
    }) : [];
  const handleFilterChange = (value) => {
    value === 'All' ? setSelectedLevel(''): setSelectedLevel(value);
   
  };
  const handleSearchChange = (e) => {
     setSearchVvalue(e.target.value)
  };
  if(isLoading){
      return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
    }
    console.log(searchValue)
  return (
    <>
    { subview === 0 &&
      <>
      <div className='flex justify-between items-center'>
        <SeachBar searchValue={searchValue} onChangeFunction={handleSearchChange} text={'by Title'}/>
         <button onClick={()=>{dispatch(setSubView(0));
                 navigate('/learn')}} className={`mx-4 my-6 bg-secondaryClr  border-2 border-primaryClr text-mainClr px-4 py-3 min-w-fit rounded-lg  font-mono font-bold hover:bg-primaryClr hover:text-secondaryClr hover:border-secondaryClr  `}>Learn with AI</button>
      </div>
      

      <div className='flex flex-col gap-[0.5rem] ' >
        <div className='flex justify-between items-center'>
            <Select className='self-right w-1/6 my-4 min-w-fit bg-red-200'   
              checkIconPosition="right"
              classNames={{input: 'bg-primaryClr text-textCLr dark:bg-darkmodeElementClr dark:text-textCLr'}}   
            data={['All','Easy','Medium','Hard']} placeholder="Filter by Level"  value={selectedLevel} onChange={handleFilterChange}/>
            <div className='flex flex-col gap-2 items-end'>
              <div className='flex flex-row gap-2 text-xs font-[700]'>Solved <input type='checkbox' checked={solved} onChange={()=>setSolved(!solved)}/></div>
              <div className='flex flex-row gap-2 text-xs  font-[700]'>Unsolved <input type='checkbox' checked={unSolved} onChange={()=>setUnSolved(!unSolved)}/></div>
            </div>
        </div>
      
        
         {isError && <div className='min-h-[32rem] flex items-center justify-center gap-2'><p className='text-red-200'>An error occured</p><IconMoodEmpty className='w-[20px] h-[20px]'/></div>}
         {filteredData && filteredData.length ? ([...filteredData].sort((a,b)=> a.order - b.order ).map((x)=><QuestionContainerLearner  key={x.id}  id={x.id}  question={x.title} level={x.level} category={x.category}  setSolvedArray={setSolvedArray} />)):<div className='min-h-[32rem] flex items-center justify-center gap-2'><p>No {`${selectedLevel ? selectedLevel : ''}`} Challenges added</p><IconMoodEmpty className='w-[20px] h-[20px]'/></div>}
       </div>
       </> }
    { subview === 1 && <Outlet/> }
    </>
  )
}

export default Questions