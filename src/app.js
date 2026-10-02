const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const userRoutes = require("./routes/user.route");
const proposalRoutes = require("./routes/proposal.route")

app.use("/api/users", userRoutes);
app.use("/api/proposals", proposalRoutes)





module.exports = app;



