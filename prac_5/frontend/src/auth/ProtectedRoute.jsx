import {useAuth} from "../auth/AuthContext";
import {Navigate} from "react-router-dom"


function ProtectedRoute({children}){

    const {user, loading} = useAuth();

    if(loading){
        return <h1>Loading...</h1>
    }

    if(!user) return <Navigate to="/login" replace />

    return children
}

export default ProtectedRoute;