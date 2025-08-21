const mysql = require('mysql2/promise');

async function listDatabases() {
  const connection = await mysql.createConnection({
    host: 'database-1.cpwu4kssknia.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Joshkim527!',
    port: 3306
  });

  const [rows] = await connection.query('SHOW DATABASES;');
  console.log(rows);
  await connection.end();
}

listDatabases();

