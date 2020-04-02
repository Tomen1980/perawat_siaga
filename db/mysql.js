const mysql = require("mysql")

db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_siaga",
    multipleStatements: true
});

db.connect((err)=>{
    if(err) throw err;
    else{
        console.log("Database Terhubung")
    }
})

module.exports = db;
