const Proposal = require("../models/proposal.model");
const User = require("../models/user.model");

const createProposal = async (req,res)=>{
    try {
        const {title, description, timeline,price, clientId}=req.body;
        if(!title || !description ||!timeline || !price || !clientId){
            return res.status(400).json({
                message: "Invalid details"
            })
        }
        const freelancerId = req.user.userId;
        if(!freelancerId){
            return res.status(500).json({
                message: "Server error"
            })
        }

        const client = await User.findById(clientId);
        if(!client){
            return res.status(404).json({
                message: "Client not found"
            })
        }
        if(client.role != "client"){
            return res.status(403).json({
                message: "Unauthorized User"
            })
        }
        const newProposal = await Proposal.create({
            freelancerId,
            title,
            description,
            price,
            timeline,
            clientId
        })

        return res.status(201).json({
            message: "New Proposal is created",
            newProposal
        })

    } catch (error) {
        console.log("Error in creating the proposal:", error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}

const getMyProposal = async (req,res)=>{
    try {
        const freelancerId = req.user.userId;
    
        const proposals = await Proposal.find({freelancerId});
    
        return res.status(200).json({
            message: "Proposal fetched successfully.",
            proposals
        })
    } catch (error) {
        console.log("Server error.", error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const getRecievedProposals = async (req, res) =>{
        try {
            const clientId = req.user.userId;
            const recievedProposals = await Proposal.find({clientId});

            return res.status(200).json({
                message: "Recieved client proposal.",
                recievedProposals
            })
        } catch (error) {
            console.log("Server Error", error);
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
    



module.exports = {
    createProposal,
    getMyProposal,
    getRecievedProposals
}