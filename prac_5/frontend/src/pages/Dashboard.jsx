import { useState, useEffect } from "react";
import api from "../http/index"

function Dashboard(){

    const [data, setData] = useState("");

    let res;
    useEffect(()=>{
        try{
            const fetchData = async()=>{
            const res = await api.get("/auth/dashboard");
            console.log(res);
            setData(res?.data);
        }
        fetchData();
    }
    catch(err){
        console.log(err);
    }
        },[])
    return(
        <>
            <h1>this dashboard</h1>
            <h1>h1 {data}</h1>
        </>
    )
}

export default Dashboard;