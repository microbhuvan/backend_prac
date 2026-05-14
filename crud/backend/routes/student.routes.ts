import express from "express";
import { insertStudent } from "../controllers/student.controllers.js";
const studentRouter = express.Router();


studentRouter.post("/", insertStudent);

export default studentRouter;