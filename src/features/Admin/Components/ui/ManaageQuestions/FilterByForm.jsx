import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react"
import { useState } from "react"
function FilterByForm({ data,setFilterValue,setFilter,filterValue }) {
  const categories = data ? [...new Set([...data].map((x)=>x.category))] :[]
  // const date = data ? [...new Set([...data].map((x)=>x.createdAt.split('T')[0]))] :[]

  const [ open,setOpen ]= useState(0)
  const [ date,setDate ] = useState('')
  const handleSettingFilterValue = (category) => {
    setFilterValue(category)
  };
  console.log('date',date)
  console.log('data',data)


  return (
    <div className='absolute bg-mainClr dark:bg-darkmodeMainClr top-0 bottom-0 sm:left-0 md:left-[25%] lg:left-[40%] xl:left-[50%] right-0 sm:px-6 md:px-10 shadow-xl z-20 '>
       <IconX className="relative top-4 left-[99%] right-6" onClick={()=>setFilter(false)}/>
       <p className='text-[24px]  py-[31px] font-[500] leading-[32px] tracking-[.015em]'>Filters</p>
    
   
        <div className='flex flex-col ' >
                <div onClick={()=>{ open === 1 ? setOpen(0) : setOpen(1);setFilterValue('')}} className='flex justify-between py-[12px] border-b-[0.5px] border-[#B5B5B5] h-fit min-w-[210px]' >
                    <p className='text-[16px] font-[500] leading-[24px] tracking-[.03375em]'>Catogary</p>
                     { open !== 1 ? <IconChevronDown/> :<IconChevronUp/>}
                </div>
               
                { open === 1 && <ul className="bg-primaryClr rounded-b-lg border-[0.5px] border-primaryClr">
                       { categories.map((category,index)=><li onClick={()=>handleSettingFilterValue(category)} className={`border-b-[0.5px] border-primaryClr  flex items-center justify-between hover:bg-primaryClr px-4 py-4 ${category === filterValue ?'bg-primaryClr border-2':''}`} key={index}><span>{category}</span></li>)}
                     </ul>}
        </div> 
        {/* <div className='flex flex-col  '>
                <div onClick={()=>{ open === 2 ? setOpen(0) : setOpen(2)}} className='flex justify-between py-[12px] border-b-[0.5px] border-[#B5B5B5] h-fit ' >
                    <p className='text-[16px] font-[500] leading-[24px] tracking-[.03375em]'>Filter by date</p>
                    { open !== 2 ? <IconChevronDown/> :<IconChevronUp/>}
                </div>
                { open === 2 && <ul className="w-full bg-primaryClr rounded-b-lg border-[0.5px] border-primaryClr">
                       { date.map((category,index)=><li className={`border-b-[0.5px] border-primaryClr  flex items-center justify-between hover:bg-primaryClr px-4 py-4 ${category === filterValue ?'bg-primaryClr border-2':''}`} key={index}><span>{category}</span></li>)}
                     </ul>}
             
        </div>    */}
         
       
        <div  className='flex flex-col gap-2  py-[12px] border-b-[0.5px] border-[#B5B5B5]  min-w-[210px]'>
         <p className='text-[16px] font-[500] leading-[24px] tracking-[.03375em] '>Filter by date</p>
         <input type="date" onChange={(e)=>setDate(e.target.value)}  className=' bg-transparent border-[0.5px] border-primaryClr rounded-lg p-2'/>
         <button onClick={()=>handleSettingFilterValue(date)} className="px-2 py-2 bg-lightSecondaryClr rounded-md hover:bg-opacity-80 font-[700]">Submit</button>
        </div>
          
    </div>     
  )
  
}

export default FilterByForm