import mongoose from "mongoose";

export interface StudentType{
    name: string,
    email: string
};

const studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }
},
{timestamps: true}
);

const Student = mongoose.model<StudentType>("Student", studentSchema);
export default Student;