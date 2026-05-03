
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";

function Logout(){

    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        navigate("/");
    }

    return(
        <button onClick={handleLogout}>LOGOUT</button>
    )
}

export default Logout;