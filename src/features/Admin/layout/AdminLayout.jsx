import { useSelector } from 'react-redux'
import Sidebar from '../../../Components/ui/Sidebar'
import { sideBarData } from '../Components/ui/Data'
import Navbar from '../../../Components/ui/Navbar'
function AdminLayout({children}) {
  const view = useSelector((state)=>state.view.curView)
  const subview = useSelector((state)=>state.view.curSubView)
  return (
     <>
         {view===0 && <Navbar />}
        <main className='min-h-screen bg-mainClr dark:bg-darkmodeMainClr  flex sm:flex-col  md:flex-row'>
        { subview === 0 && <Sidebar Data={sideBarData}/>}
        <section className={`w-full   text-lightmodeTextClr dark:text-darkmodeTextClr sm:p-[16px] md:p-[20px] ${ subview === 0 ? 'sm:mb-[72px] md:mb-[0] md:ml-[74px] ' : ''}`}>
           {children}
        </section>
           
        </main>
        </>
  )
}

export default AdminLayout