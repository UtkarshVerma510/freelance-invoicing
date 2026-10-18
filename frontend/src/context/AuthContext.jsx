import { createContext, useState, useContext, useEffect} from "react";
import axiosInstance from "../api/axiosInstance";


const AuthContext = createContext();

export function AuthProvider({children}){
    const [ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/users/me");
                setUser(response.data.user);
            } catch (error){
                setUser(null);
            } finally{
                setLoading(false);
            }
        }
        fetchUser();
    },[])






    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth(){
    return useContext(AuthContext);
}