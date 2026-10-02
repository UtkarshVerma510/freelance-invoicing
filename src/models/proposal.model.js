const mongoose = require("mongoose")

const proposalSchema = new mongoose.Schema({
    freelancerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "freelancerId is required"]
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true, "ClientId is required"]
    },
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    description:{
        type: String,
        required: [true, "Description is required."]
    },
    price:{
        type: Number,
        required: [true, "Price is required"]
    },    
    timeline:{
        type: String,
        required: [true, "Give the timeline"]
    },
    status:{
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        default:'PENDING',
    }
},{timestamps: true})

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;