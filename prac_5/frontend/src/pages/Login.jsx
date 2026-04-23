import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {useAuth} from "../auth/AuthContext"

function Login(){

    console.log("entering login")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const res = await axios.post(
                `${BASE_URL}/auth/login`,
                {
                    email,
                    password
                },
                {withCredentials: true}
            )

            console.log("working result")
            console.log(res);
            setUser(res.data.user);
            navigate("/dashboard")
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" 
                value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">password</label>
                <input type="text" name="password"id="password"
                value={password} onChange={(e) => setPassword(e.target.value)} />

                <input type="submit" value="submit" />
            </form>
        </>
    )
}
export default Login