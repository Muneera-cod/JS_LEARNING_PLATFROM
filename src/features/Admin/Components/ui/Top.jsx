import SeachBar from '../../../../Components/ui/SeachBar'
function Top({buttonText,searchbar,buttonclick}) {
  return (
    <>

       <div className={`flex ${!searchbar && 'justify-end'} w-full items-center  pb-4 ${searchbar && 'justify-between'}`}>
       
        {searchbar && <SeachBar />}
        <button className='bg-secondaryClr text-textCLr text-[15px] border-2 border-primaryClr hover:text-mainClr px-4 py-[4px] min-w-fit rounded-md  font-[700] hover:bg-lighterSeocndaryClr  hover:border-secondaryClr' onClick={buttonclick}>{buttonText}</button>
       </div>
    </>
  )
}

export default Top