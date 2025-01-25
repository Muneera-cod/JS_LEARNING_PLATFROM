import React from 'react'
import { IconSearch } from '@tabler/icons-react'
function SeachBar({ searchValue,onChangeFunction,text }) {
  return (
    <div className='w-[200px] rounded-md flex bg-primaryClr items-center px-4 py-[1px] gap-2'>
      <IconSearch className='w-4 h-4'/>
    <input type="text" name="" id="" placeholder={`Search ${text ? text : ''}`} value={searchValue} onChange={onChangeFunction}  className='border-transparent bg-transparent w-full p-2 rounded-md'/>
   </div>
  )
}

export default SeachBar