import { useAuth } from "./AuthContext";
import { Outlet, Navigate } from "react-router";

function ProtectedRoute({allowedRoles}){

    const { user } = useAuth();
    console.log(user);
    
    if(!user){
        return <Navigate to="/login" />
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/unauthorized" />
    }

    return <Outlet />

}

export default ProtectedRoute;