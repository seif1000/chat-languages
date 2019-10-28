const mysql = require('mysql2');



const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'bootf',
    password:'benmazouzseifeddine1994'
})

module.exports = pool.promise();