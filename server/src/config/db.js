const {neon} = require("@neondatabase/serverless");
require("dotenv").config();

 const sql = neon(process.env.DATABASE_URL);

const database = async()=>{
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        create_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("Error initializing DB", error.message);
        process.exit(1) 
    }
}
database();


module.exports = sql;


