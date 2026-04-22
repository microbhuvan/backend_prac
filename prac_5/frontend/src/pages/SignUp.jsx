import axios from "axios";
//import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

function SignUp(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log("working")
    async function handleSignup(e){
        console.log("entering signup")
        e.preventDefault();
        try{
            const res = await axios.post(
            `${BASE_URL}/auth/signup`,
            {
                name,
                email,
                password
            },
            {withCredentials: true}
            )

            console.log(res);
            console.log("successful")
        }
        catch(err){
            console.log(err.response);
        }
    
    }

    return (
        <>
            <form onSubmit={handleSignup}>
                
                <input type="text" name="name" id="name" 
                value={name} onChange={(e) => setName(e.target.value)}/>

                
                <input type="email" name="email" id="email" 
                value={email} onChange={(e) => setEmail(e.target.value)} />

                
                <input type="password" name="password" id="password" 
                value={password} onChange={(e) => setPassword(e.target.value)}  
                />
                
                <input type="submit" value="submit" />
            </form>
        </>
    )
}

export default SignUp;