import { Button } from '@mantine/core'
import React from 'react'
import SeachBar from '../../../../Components/ui/SeachBar'
function Top({buttonText,searchbar,buttonclick}) {
  return (
    <>

       <div className={`flex ${!searchbar && 'justify-end'} items-center px-2 pb-4 ${searchbar && 'justify-between'}`}>
       
        {searchbar && <SeachBar />}
        <Button className='bg-green-500 px-20 py-10' onClick={buttonclick}>{buttonText}</Button>
       </div>
    </>
  )
}

export default Top