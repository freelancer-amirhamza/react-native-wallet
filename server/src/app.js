const express = require("express");
const app = express()
const cors = require("cors");
require("./config/db.js")
const transactionRouter = require("./routes/transaction-route.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const { default: job } = require("./config/cron.js");






app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use("/api/transaction",transactionRouter);
app.get("/", (req, res)=>{
    res.send("<center><h1>Welcome to react native wallet server site.</h1></center> ")
});
app.get("/api/health", (req, res)=>{
    res.status(200).json({status:"ok"});
})
if(process.env.NODE_ENV === "production") job.start(); 
 
module.exports = app;