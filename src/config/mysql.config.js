import mysql from 'mysql';
import dotenv from 'dotenv';


dotenv.config();

const pool = mysql.createPool({

    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    connectionLimit: process.env.DB_CONNECTION_LIMIT  //limit of que=[]
        
});

export default pool;

