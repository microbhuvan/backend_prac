import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

function App(){

    <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
    

    return(
        <>
            <h1> its working</h1>
        </>
    )
}

export default App;