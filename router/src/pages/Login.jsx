import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

function Login(){
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleLogin(){
        login()
        navigate("/pages");
    }

    return(
        <button onClick={handleLogin}>LOGIN</button>
    )
}

export default Login;