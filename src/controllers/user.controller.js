const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const registerUser = async (req,res)=>{
    try {
        const {username, email, role, password} = req.body;

        if(!username){
            return res.status(400).json({
                message: "username is required"
            })
        }
        if(!email){
            return res.status(400).json({
                message: "Enter the email"
            })
        }
        if(!role){
            return res.status(400).json({
                message: "Please tell the role(freelancer or client)"
            })
        }
        if(!password){
            return res.status(400).json({
                message: "Password is required"
            })
        }

        const userAlredyExists = await User.findOne({
            $or: [{username}, {email}]

        })

        if(userAlredyExists){
            return res.status(409).json({
                message: "User already exists."
            })
        }

        const newuser = await User.create({
            username: username,
            email: email,
            role,
            password: password
        })
        
        const createdUser = await User.findById(newuser._id).select("-password");

        res.status(201).json({
            message: "User created successfully",
            createdUser
        })




    } catch (error) {
        console.log("Error in register user:", error);
        res.status(500).json({
            message: "Something went wrong in the server."
        })
    }
}


const loginUser = async (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "Fill email and password"
        })
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({
            message: "Fill the correct email and passowrd"
        })
    }

    
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Fill the correct email and  passowrd"
        })
    }

    const token = jwt.sign(
        {
        userId:user._id,
        role: user.role
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: "7d"}
    )

    res.cookie("token", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        maxAge: 7*24*60*60*1000
    });

    const loggedInUser = await User.findById(user._id).select("-password");

    res.status(200).json({
        message: "User Login Successfully",
        loggedInUser
    })







}


module.exports = {
    registerUser,
    loginUser
}