const express = require("express");
const { verifyJwt, isFreeLancer, isClient } = require("../middlewares/auth.middleware.js");
const { createProposal, getMyProposal, getRecievedProposals, respondToProposal } = require("../controllers/proposal.controller.js");
const router = express.Router();

router.post("/create", verifyJwt, isFreeLancer, createProposal);
router.get("/my-proposals", verifyJwt, isFreeLancer, getMyProposal);
router.get("/recievedProposals", verifyJwt, isClient, getRecievedProposals);
router.patch("/:id/responds", verifyJwt, isClient, respondToProposal)

module.exports = router;