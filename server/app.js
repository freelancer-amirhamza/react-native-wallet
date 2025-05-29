const express = require("express");
const app = express()
const cors = require("cors");
require("./config/db.js")
const transactionRouter = require("./routes/transaction-route.js")






app.use(express.json())
app.use(cors())
app.use("/api/transaction",transactionRouter);
app.get("/", (req, res)=>{
    res.send("<center><h1>Welcome to react native wallet server site.</h1></center> ")
});


module.exports = app;