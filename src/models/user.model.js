const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Fill the valid email address."]
    },
    role:{
        type: String,
        enum: ["freelancer", "client"],
        required: true
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true})

userSchema.pre("save",async function (){
    if(!this.isModified("password")){
        return 
    }
    this.password = await bcrypt.hash(this.password, 10)
    return 
})

userSchema.methods.isPasswordCorrect = async function (plainpassword){
    return bcrypt.compare(plainpassword, this.password);
}


const User = mongoose.model("User", userSchema);

module.exports=User;