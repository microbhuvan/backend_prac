import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router"
import { AuthProvider } from "./auth/AuthContext"
import Home from "./pages/Home"
import About from "./pages/About"
import Contacts from "./pages/Contacts"
import Pages from "./pages/Pages"
import First from "./pages/First"
import Second from "./pages/Second"
import Dynamic from "./pages/Dynamic"
import MainLayout from "./pages/MainLayout"
import Login from "../src/pages/Login";
import Logout from "../src/pages/Logout";
import ProtectedRoute from "./auth/ProtectedRoute"
import Unauthorized from "./pages/Unauthorized"

function App(){

    console.log("to check working")

    return(
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />} >
                    <Route index element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/contacts" element={<Contacts />} />
                    
                    <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
                        <Route path="/pages">
                            <Route index element={<Navigate to="first" />} />
                            <Route path="first" element={<First />} />
                            <Route path="second" element={<Second />} />
                        </Route>
                        
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={["user"]}/>}>
                        <Route path="/dynamic/:id" element={<Dynamic />} />
                    </Route>
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
            
        
    )
}

export default App;