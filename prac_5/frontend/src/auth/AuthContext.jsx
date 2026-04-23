import { createContext, useContext, useState, useEffect } from "react";
import api from "../http/index";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const checkAuth = async()=>{
            try{
                const res = await api.get("/auth/me");
                console.log(res);
                setUser(res.data.user);
            }
            catch(err){
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        }
        checkAuth();
    },[])

    return(
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);