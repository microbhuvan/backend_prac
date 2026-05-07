import axios from "axios"
import { useNavigate } from "react-router";

function SignUp(){

    const [username, setUserame] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const navigate = useNavigate();

    async function handleSignup(){
        try{
            const res = await axios.post("http:localhost:3000/auth/signup", {
                username,
                email, 
                password
            })
            console.log(res);
            navigate("/dashboard");
            
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <h1>signup page</h1>
            <form onSubmit={handleSignup}>

                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username"
                value={username} onChange={(e)=>setUserame(e.target.value)}
                />

                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email"
                value={email} onChange={(e)=>setEmail(e.target.value)}
                />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password"
                value={password} onChange={(e)=>setPassword(e.target.value)}
                />

                <input type="submit" value="submit" />
            </form>
        </>
    )
}

export default SignUp;