import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../api/axiosInstance";

export default function DashBoard(){
    const { user,setUser, loading } = useAuth();
    const navigate  = useNavigate();

    const handleLogout = async () =>{
        try {
            await axiosInstance.post("/users/logout");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.log(error.response.data);
        }
    }




    if(loading) return <p>Loading...</p>


    return (<>
        <p>{user.username}, Welcome to DashBoard! </p>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}