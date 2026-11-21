const jwt = require("jsonwebtoken")

const verifyJwt =  function (req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Cookies not found"
        })
    }

    try {
        const verify  =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: verify.userId, role: verify.role}
        
    } catch (error) {
        console.log("Invalid token", error);
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
    next();
}
const isFreeLancer = (req,res,next)=>{
    if(req.user.role !== "freelancer"){
        return res.status(403).json({
            message: "User is not allowed, only freelancer is allowed"
        })
    }

    next();
}
const isClient = (req,res,next)=>{
    if(req.user.role !== "client"){
        return res.status(403).json({
            message: "Only client is alllowed"
        })
    }
    next();
}

module.exports = {
    verifyJwt,
    isFreeLancer,
    isClient
}