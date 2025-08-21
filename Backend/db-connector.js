// get instance of mysql to use in app
let mysql = require('mysql2')

// create connection pool using provided credentials 
const pool = mysql.createPool({
    waitForConnections: true, 
    connectionLimit : 10, 
    host : 'database-1.cpwu4kssknia.us-east-2.rds.amazonaws.com',
    user : 'admin',
    password : 'Joshkim527!',
    database : 'anccball',
    multipleStatements: true

}).promise(); 


module.exports = pool; 

