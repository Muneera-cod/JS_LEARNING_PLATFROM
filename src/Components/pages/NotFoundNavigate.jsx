import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function NotFoundNavigate() {
    const navigate = useNavigate()
    useEffect(()=>{
       navigate(-1)
    },[])
  return (
    <div>NotFoundNavigate</div>
  )
}

export default NotFoundNavigate