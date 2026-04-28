import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {useAuth} from "../auth/AuthContext"
import { forwardRef } from "react";

function Login(){

    console.log("entering login")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [blocked, setBlocked] = useState(false);
    const [error, setError] = useState(""); 
    const [timeLeft, setTimeLeft] = useState(0);


    useEffect(()=>{

        if(timeLeft <= 0) return;

        const timer = setInterval(()=>{
            setTimeLeft((prev)=> prev-1);
        }, 1000);

        return () => clearInterval(timer);
    },[timeLeft])

    useEffect(()=>{
        if(timeLeft === 0 && blocked){
            setBlocked(false);
            setError("")
        }
    },[timeLeft, error])

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

            if(err.response?.status  === 429){
                setBlocked(true);

                const retryAfter = err.response?.headers["retry-after"];

                const waitTime = retryAfter ? parseInt(retryAfter) : 60;

                setTimeLeft(waitTime);
                setError(`too many attempts try again in ${waitTime}s`)
            }
            else if(err.response?.status === 501){
                setError("invalid email or password");
            }
            else{
                setError("something went wrong");
            }
        }
    }

    return(
        <>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" 
                value={email} onChange={(e) => setEmail(e.target.value)} 
                disabled={blocked}/>

                <label htmlFor="password">password</label>
                <input type="text" name="password"id="password"
                value={password} onChange={(e) => setPassword(e.target.value)} 
                disabled={blocked}/>

                <input type="submit" disabled={blocked}
                value={blocked ? `wait ${timeLeft}s` : 'Login'}/>
            </form>
        </>
    )
}
export default Login