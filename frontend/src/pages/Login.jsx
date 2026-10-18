import { useState } from "react";
import  axiosInstance from "../api/axiosInstance"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setUser} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/users/login",{
                email,
                password
            })
            console.log(response.data);
            console.log(response.data.loggedInUser);
            setUser(response.data.loggedInUser)
            navigate("/dashboard");
        } catch (error) {
            console.log(error.response.data)
        }
    }




    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
        <br />
        <p>Don't have account <Link to={"/register"}>Register</Link></p>
    </>

    )
}