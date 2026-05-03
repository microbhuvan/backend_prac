import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){

    const [user, setUser] = useState(()=>{
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    function login(){
        const userData = {user: "bhuvan", role: "user"};
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }

    function logout(){
        localStorage.removeItem("user");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}