import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
export default function Signup(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")

    const navigate = useNavigate();

    const handleSubmit =async (e)=>{
        e.preventDefault();

        try {
            const response =await axiosInstance.post("/users/register", {
                username,
                email,
                password,
                role
            })
            console.log(response.data)
            navigate("/login")
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (<>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />

            <label htmlFor="role">Role:</label>
            <select name="role" id="role" value={role} onChange={(e)=> setRole(e.target.value)}>
                <option value="">Select Role: </option>
                <option value="freelancer">Freelancer</option>
                <option value="client" >Client</option>
            </select>
            <label htmlFor="password">Password: </label>
            <input type="password" value={password} id="password" onChange={(e)=> setPassword(e.target.value)} />

            <button type="submit">Register</button>

        </form>
        <br />
        <p>Do you have a account? <Link to={"/login"}>Login</Link></p>
        </>
    )
}