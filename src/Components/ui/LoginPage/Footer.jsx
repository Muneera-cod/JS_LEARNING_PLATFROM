import logo from '/JSLEARNNEW.webp'
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react'
function Footer() {
  return (
   
    <footer className='bg-textCLr  text-footertextClr  '>
    <div className='flex-3 flex sm:flex-col md:flex-row sm:px-8 md:px-6 lg:px-12 xl:px-20 py-[50px] gap-[30px] items-center'>
     <div className='flex items-center gap-2'>
     
      <img src={logo} className='w-12 h-8'></img>
    
      <p className='text-[18px] font-[700] uppercase'>Master .js</p>
   </div>
   
   <div className='flex-1  flex sm:flex-col md:flex-row items-center justify-end gap-4'>
     <p className='text-[16px] leading-[18px]'>FOLLOW US</p>
     <div className='gap-2 flex '>
        <IconBrandInstagram/>
        <IconBrandGithub/>
        <IconBrandLinkedin/>
     </div>
   </div>
   </div>
 <p className="text-sm font-semibold px-2">© {new Date().getFullYear()} Master .js</p>

 </footer>
  )
}

export default Footer