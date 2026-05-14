import type { Request, Response } from "express";
import Student from "../models/student.js";
import type { StudentType } from "../models/student.js";


const insertStudent = async(req: Request, res: Response)=>{
    try{

    const {name, email}: StudentType = req.body;

    const existingStudent = await Student.findOne({email}).select("email");

    if(existingStudent){
        return res.status(401).json({"message": "student already exists"});
    }

    const user = await Student.create({
        name,
        email
    });

    return res.status(200).json({message: "student enrolled", "data": user})
    }
    catch(err: unknown){
        return res.status(500).json({message: "server error"});
    }


}

export {insertStudent};