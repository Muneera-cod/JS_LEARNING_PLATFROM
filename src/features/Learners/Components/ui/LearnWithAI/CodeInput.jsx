import React from 'react'

function CodeInput({ CodeInput , setCodeInput }) {
  return (
    <textarea placeholder='Type your code here' className='bg-transparent w-full  h-full p-4 ' value={CodeInput} onChange={(e)=>{setCodeInput(e.target.value)}}>

    </textarea>
  )
}

export default CodeInput