import { Button } from '@mantine/core'
import React from 'react'
import SeachBar from '../../../../Components/ui/SeachBar'
function Top({buttonText,searchbar,buttonclick}) {
  return (
    <>

       <div className={`flex ${!searchbar && 'justify-end'} items-center px-2 pb-4 ${searchbar && 'justify-between'}`}>
       
        {searchbar && <SeachBar />}
        <button className='bg-lightSecondaryClr px-4 rounded-md py-2' onClick={buttonclick}>{buttonText}</button>
       </div>
    </>
  )
}

export default Top