const express = require("express");
const { addTransaction, getTransaction, deleteTransaction, transactionSummery } = require("../controllers/transaction");
const router = express.Router();

router.post("/create", addTransaction);
router.get("/get/:userId",getTransaction);
router.delete("/delete/:id", deleteTransaction);
router.get("/summery/:userId",transactionSummery)





module.exports = router;