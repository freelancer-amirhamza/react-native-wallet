const sql = require("../config/db");


const addTransaction = async (req, res) => {
    try {
        const { title, amount, category, user_id } = req.body;
        if (!title || !category || !user_id || amount === undefined) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "All field are required!",
            })
        }

        const transaction = await sql`
            INSERT INTO transactions(title,user_id,category, amount)
            VALUES (${title}, ${user_id}, ${category},${amount})
            RETURNING *
        `
        res.status(201).json({
            success: true,
            error: false,
            message: "Transaction created successfully!",
            data: transaction[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

const getTransaction = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const transaction = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY create_at DESC
        `;

        res.status(201).json({
            success: true,
            error: false,
            message: "Transaction gotten successfully!",
            transaction
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
};


const deleteTransaction = async(req, res)=>{
    try {
        const {id} = req.params;
        if(isNaN(parseInt(id))){
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid transaction ID!"
            })
        }
        const result = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;
        if(result.length === 0){
            return res.status(404).json({
                success: false,
                error:true,
                message: "Transaction not found!"
            })
        };

        res.status(201).json({
            success: true, 
            error: false,
            message: "The transaction deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

const transactionSummery =async(req,res)=>{
    try {
        const {userId} = req.params;
        const balanceResult = await sql`
        SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}
        `;
        const expensesResult = await sql`
        SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
        `;
        const incomeResult = await sql`
        SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
        `;

        res.status(200).json({
            success:true,
            error: false,
            message: "transaction summery gotten successfully!",
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}





module.exports = { addTransaction, getTransaction, deleteTransaction,transactionSummery }