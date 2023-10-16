import { createPool, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db: Pool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // port: Number(process.env.MYSQL_PORT)
});

// Let's Check database connectivity
db.getConnection()
    .then(connection => {
        console.log("Successfully connected to the database!");
        connection.release();
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
    });
