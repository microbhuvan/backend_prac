import { NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";

function Home(){
    const navigate = useNavigate();
    const [counter, setCounter] = useState(10);
    
    useEffect(()=>{
        const timer = setInterval(()=>{
            setCounter((prev)=>{
            if(prev <= 0){
                clearInterval(timer);
                return 0;
            }
            return prev-1;
            })
        }, 1000)

        return ()=>clearInterval(timer);
    },[]);

    useEffect(()=>{
        if(counter === 0){
            navigate("/contacts");
        }
    },[counter]);

    return(
        <>
            <h1>Home page</h1>
            <NavLink to="/about">about</NavLink>
            <p>changing to contacts in {counter}s</p>
        </>
    )
}

export default Home;