import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./Pages/Student";

function App(){
    <BrowserRouter>
        <Routes>
            <Route path="/student" element={<Student/>} />
        </Routes>
    </BrowserRouter>

}

export default App;