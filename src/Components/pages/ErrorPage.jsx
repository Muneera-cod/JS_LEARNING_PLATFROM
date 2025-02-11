import { IconError404 } from "@tabler/icons-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function ErrorPage() {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate(-1)
  },[])
  return (
    <div className='flex flex-col items-center justify-center h-screen text-2xl text-red-500'>
        <IconError404/>
        <p>Page Not Found</p>
        <button className="underline font-[700] mx-4" onClick={()=>navigate(-1)}>Go back</button>
    </div>
    )
}

export default ErrorPage