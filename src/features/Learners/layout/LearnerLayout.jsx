import { useSelector } from "react-redux"
import Navbar from "../../../Components/ui/Navbar"
import Sidebar from "../../../Components/ui/Sidebar"
import { sideBarData } from "../Components/ui/SidebarData"

function LearnerLayout({children}) {
    const view=useSelector((state)=>state.view.curView)

  return (
   <>
      {view===0 && <Navbar />}
        <main className='min-h-screen bg-mainClr dark:bg-darkmodeMainClr  flex sm:flex-col  md:flex-row'>
            <Sidebar Data={sideBarData}/>
        <section className='w-full  sm:mb-[72px] md:mb-[0] md:ml-[74px] p-[20px]  text-lightmodeTextClr dark:text-darkmodeTextClr '>
           {children}
        </section>
           
        </main>
   </>
  )
}

export default LearnerLayout