var mysql = require('mysql2')

const con = () => {
    return mysql.createConnection({
        host: "maga-db",
        user: "root",
        password: "Atlantykron",
        database: "maga_db"
    })
} 

module.exports = con