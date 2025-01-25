import { useEffect, useState } from 'react'
import Top from '../../ui/Top'
import QuestionContainer from '../../ui/ManaageQuestions/QuestionContainer'
import { IconArrowsSort,IconArrowLeft,IconSearch } from '@tabler/icons-react'
import { Select } from '@mantine/core'
import { useDispatch ,useSelector} from 'react-redux'
import { IconMoodEmpty } from '@tabler/icons-react'
import { setSubView } from '../../../../../redux/reducers/View/ViewSlice'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useFetchQuestionsQuery } from '../../../../../redux/Api/QuestionApiSlice'
import { Loader } from '@mantine/core'
import '@mantine/core/styles.css'
import FilterByForm from '../../ui/ManaageQuestions/FilterByForm'
function ManageQuestions() {
 const navigate = useNavigate()
  
 useEffect(()=>{window.scrollTo(0, 0)},[])
  const {data,isLoading,isError,isSuccess,error}=useFetchQuestionsQuery()
  const dispatch=useDispatch()
  const subview=useSelector((state)=>state.view.curSubView)

 const addQSTNClick=()=>{
  navigate('add_question');
  dispatch(setSubView(1))
}
const [filter,setFilter] = useState(false)

const [filterValue,setFilterValue] = useState('')
const [selectedLevel,setSelectedLevel] = useState('')
const [ searchValue,setSearchValue ] = useState('')
const filteredData = data ? data.filter((question)=>{
  const matchSelection = selectedLevel && selectedLevel !== 'All' ? question.level.toLowerCase() === selectedLevel.toLowerCase() : true 
  const matchSearchValue = searchValue ? question.title.toLowerCase().includes(searchValue.toLowerCase()) : true
  const matchFilter = filterValue ? question.category.toLowerCase() === filterValue.toLowerCase()   || question.createdAt.split('T')[0] === filterValue  : true 

  return matchSelection && matchSearchValue && matchFilter
}) : [];
console.log('filterValues',filterValue)
const handleFilterChange = (value) => {
  setSelectedLevel(value);
 
};
if(isLoading){
    return <div className='min-h-[40rem] w-full flex items-center justify-center'><Loader color="yellow" type="dots" /></div>
  }
  if(isError){
    return <div className='min-h-[15rem] w-full flex items-center justify-center'>An Error occured{error}</div>
}
  return (
  <>
       {subview===0 && <>
        <IconArrowLeft className="opacity-50 hover:opacity-100 text-lightsecondaryClr mb-4 -mt-2" onClick={()=>navigate('/')}/>

        <div className={`flex  w-full items-center  pb-4 justify-between `}>
          <div className='w-[185px] rounded-md flex bg-primaryClr items-center px-4 py-[1px] gap-2'>
              <IconSearch className='w-4 h-4'/>
              <input type="text" name="" id="" placeholder={`Search by title`} value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}  className='border-transparent bg-transparent w-full p-2 rounded-md'     aria-label="Search questions by title"/>
          </div>       
       <button className='bg-secondaryClr text-textCLr text-[15px] border-2 border-primaryClr hover:text-mainClr px-4 py-[4px] min-w-fit rounded-md  font-[700] hover:bg-lighterSeocndaryClr  hover:border-secondaryClr' onClick={addQSTNClick}>Add Question</button>
      </div>

       <div className='flex flex-col gap-[0.5rem] ' >
        <div className='flex justify-between my-2 items-center'>
            <Select   
              checkIconPosition="right"
               classNames={{
                input: 'border border-yellow-500 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400',
                label: 'text-blue-600 font-semibold',
                dropdown: 'bg-primaryClr shadow-lg border border-gray-200 rounded-lg',
                item: 'hover:bg-yellow-800 cursor-pointer p-2 rounded-md',
              }}  
            data={['All','Easy','Medium','Hard']} placeholder="Filter by Level"  value={selectedLevel} onChange={handleFilterChange}/>
            <div className='flex items-center gap-2 opacity-60' onClick={()=>{setFilter(true)}}><IconArrowsSort className='max-w-6 max-h-6'/><p className='sm:text-sm lg:text-md'>Filter</p></div>
        </div>
      
        
         {isError && <div className='min-h-[32rem] flex items-center justify-center gap-2'><p className='text-red-200'>An error occured</p><IconMoodEmpty className='w-[20px] h-[20px]'/></div>}
         {filteredData && filteredData.length ? ([...filteredData].sort((a,b)=> a.order - b.order ).map((x)=><QuestionContainer  key={x.id}  id={x.id} slno={x.order} question={x.title} level={x.level} />)):<div className='min-h-[32rem] flex items-center justify-center gap-2'><p>No Questions Found</p><IconMoodEmpty className='w-[20px] h-[20px]'/></div>}
       </div>
       { filter && <FilterByForm  data={data} setFilterValue={setFilterValue} filterValue={filterValue} setFilter={setFilter}/>}
       </>
       }
      
      { subview === 1 && <Outlet/>}
      
  </>
 
    
  )
}

export default ManageQuestions