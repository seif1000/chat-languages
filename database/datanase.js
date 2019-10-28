const mysql = require('mysql2');

const key = require('../config/config');

const pool = mysql.createPool({
    host:key.host,
    user:key.user,
    database:key.database,
    password:key.password,
  
    
})

module.exports = pool.promise();