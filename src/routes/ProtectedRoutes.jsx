import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import LoadingPage from "../Components/pages/LoadingPage"
import { useCheckAuthQuery } from "../redux/Api/authApiSlice"
const ProtectedRoutes=({element,currUserRole})=> {
    const { data ,isLoading} = useCheckAuthQuery()

    if ( isLoading ){
        return <LoadingPage/>;
        
    }
if( data?.role !== currUserRole ){
    return <Navigate to='/'/>;
}

    return element
      
      
}

export default ProtectedRoutes