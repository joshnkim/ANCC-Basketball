// get instance of mysql to use in app
let mysql = require('mysql2')

// create connection pool using provided credentials 
const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    multipleStatements: true

}).promise(); 


module.exports = pool; 

