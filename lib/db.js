const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "school"
});

conn.connect((err) => {
    if(!err)
    console.log('Connected to database Successfully');
    else
    console.log('Connection Failed!' + JSON.stringify(err,undefined, 2))
});

module.exports = conn;