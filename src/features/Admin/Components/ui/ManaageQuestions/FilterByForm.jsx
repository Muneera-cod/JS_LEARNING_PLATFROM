import { IconX } from "@tabler/icons-react"

function FilterByForm({ setFilter }) {
  return (
    <div className='absolute bg-mainClr dark:bg-darkmodeMainClr top-0 bottom-0 sm:left-[25%] md:left-[50%] right-0 px-10 shadow-xl z-20 '>
       <IconX className="relative top-4 left-[99%] right-6" onClick={()=>setFilter(false)}/>
       <p className='text-[24px]  py-[31px] font-[500] leading-[32px] tracking-[.015em]'>Filters</p>
    
   
        <div className='flex flex-col  gap-[24px]' >
                <div className='flex justify-between py-[12px] border-b-[0.5px] border-[#B5B5B5] h-fit min-w-[232px]' onClick={()=>handleToggle('brand')}>
                    <p className='text-[16px] font-[500] leading-[24px] tracking-[.03375em]'>Catogary</p>
                  
                </div>
               

        </div> 
        <div className='flex flex-col  gap-[24px]'>
                <div className='flex justify-between py-[12px] border-b-[0.5px] border-[#B5B5B5] h-fit min-w-[232px]' onClick={()=>handleToggle('build in memory')}>
                    <p className='text-[16px] font-[500] leading-[24px] tracking-[.03375em]'>Order by latest</p>
                   
                </div>
             
        </div>   
         
       
        
          
    </div>     
  )
  
}

export default FilterByForm