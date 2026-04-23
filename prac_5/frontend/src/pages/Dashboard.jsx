import { useState, useEffect } from "react";
import api from "../http/index"
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"

function Dashboard(){

    //const [data, setData] = useState("");

    const { user } = useAuth();
    
    // useEffect(()=>{
    //     try{
    //         const fetchData = async()=>{
    //         const res = await api.get("/auth/dashboard");
    //         console.log(res);
    //         setData(res?.data?.data);
    //     }
    //     fetchData();
    // }
    // catch(err){
    //     console.log(err);
    // }
    //     },[])
    return(
        <>
            <nav>
                <Link to="/login"> Login</Link>
                <Link to="/signup"> SignUp</Link>
                <Link to="/logout">Logout</Link>
            </nav>
            <h1>this dashboard</h1>
            <h1>name: {user?.name}</h1>
            <h1>email: {user?.email}</h1>
        </>
    )
}

export default Dashboard;