import mysql from 'mysql2';

console.log('hello')
console.log(`DB_USER = `, process.env.DB_USER)

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});