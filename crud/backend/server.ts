import express from "express";
import type {Request, Response} from "express";
const app = express();
import connectDB from "./config/db.js";
import cors from "cors";
import studentRouter from "./routes/student.routes.js";

app.use(cors({origin:"http://localhost:3000/", credentials: true}));
app.use(express.json());
app.use("/student", studentRouter);

app.get("/", (req: Request, res: Response)=>{
    return res.status(200).json({message: "hi working"});
})

connectDB()
.then(()=>{
    app.listen(3000, ()=>{
        console.log("server started");
    })
})
.catch((err)=>{
    console.log("server error")
})
