import { useState } from "react";
import type { StudentType } from "../types/student";
const BASE_URL = "http://localhost:3000"
import axios from "axios";

function Student(){

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [students, setStudents] = useState<StudentType[]>([]);

    const handleSubmit = async()=>{
        try{
            const res = await axios.post(`${BASE_URL}/student`,{name, email}, {withCredentials: true});

            console.log(res);
            console.log(res.data);
            const newStudent = res.data.data;

            setStudents((prev)=>[
                ...prev,
                newStudent
            ]);
        }
        catch(err){
            console.log(err);
        }
    }
    
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" placeholder="enter name here"
                value={name} onChange={(e)=>setName(e.target.value)}
            />

            <input 
                type="email" placeholder="enter email here"
                value={email} onChange={(e)=>setEmail(e.target.value)}
            />

            <input type="submit" value="insert" />
        </form>
        <ul>
            {students.map((student)=>{
                return <li key={student?._id}>{student?.name}</li>
            })}
        </ul>
        </>
    )
}

export default Student;