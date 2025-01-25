
function Contactus() {
  return (
    <form className='flex md:basis-1/2 flex-col gap-2'>
    {/* <label for='name'>Name</label> */}
    <input type='text' name='name' placeholder='Enter your name' className='bg-primaryClr  font-semibold rounded-md border-[3px] border-primaryClr p-3'></input>
    {/* <label for='name'>Email Address</label> */}
    <input type='text' name='name' placeholder='Email Address' className='bg-primaryClr  font-semibold rounded-md border-[3px] border-primaryClr p-3'></input>
    {/* <label for='name'>Phone No</label> */}
    <input type='text' name='name' placeholder='Phone Number' className='bg-primaryClr  font-semibold rounded-md border-[3px] border-primaryClr p-3'></input>
    <input type='submit' className='text-mainClr dark:bg-[rgb(240,219,79)] bg-[#404040] shadow-sm font-[700] dark:hover:bg-lighterSeocndaryClr hover:bg-[rgb(240,219,79)] my-2  py-[6px] px-[36px] min-w-1/4 lg:max-w-fit   border-2 border-primaryClr hover:text-mainClr  rounded-lg  font-bold hover:bg-lighterSeocndaryClr  hover:border-secondaryClr'/>
</form>
  )
}

export default Contactus