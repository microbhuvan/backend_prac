import { useNavigate } from "react-router-dom";
import {useAuth} from "../auth/AuthContext.jsx"
import api from "../http/index.js"


function Logout(){

    const navigate = useNavigate();

    const {setUser} = useAuth();

    async function handleLogout(){
        try{
            const res = await api.post("/auth/logout");
            console.log(res);
            setUser(null);
            navigate("/");
        }
        catch(err){
            console.log(err.message);
        }
    }


    return(
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )

}

export default Logout;