import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout"
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

function App(){
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          } />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
