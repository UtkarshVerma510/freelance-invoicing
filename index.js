require("dotenv").config()
const app = require("./src/app.js")
const database =  require("./src/db/db.js");

const PORT = process.env.PORT || 5000;

async function startServer(){
    
    await database();

    
    app.listen(PORT, ()=>{
        console.log("Server is running successfully");
    })
}

startServer();