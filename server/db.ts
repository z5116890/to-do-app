import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config() //.env


export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).on('error', function (err: any) {
    console.error('mysql failed', err)
})