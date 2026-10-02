const express = require("express")
const router  = express.Router();
const {registerUser, loginUser} = require("../controllers/user.controller.js");
const { verifyJwt, isFreeLancer } = require("../middlewares/auth.middleware.js");



router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/test-protected",verifyJwt, (req,res)=>{
    return res.status(200).json({
        message: "You are authenticied."
    })
})


module.exports = router;