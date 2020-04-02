const express = require("express");
const controllerPerawat = express.Router();

const jwt = require("jsonwebtoken")
const scretKey = "thisisverysecretkey"

controllerPerawat.get("/",(req,res)=>{
    res.json({
        message:"Hello world"
    })
})

//////////perawat
const isAuthorizedForPerawat = (req,result,next)=>{
    if(typeof(req.headers["x-api-key"])=="undefined"){
        return result.status(403).json({
            success : false,
            message : "Unauthorized. Token is not provide"
        })
    }
    let token = req.headers["x-api-key"]

    jwt.verify(token,scretKey,(err,decoded)=>{
        if(err){
            return result.status(401).json({
                success:"false",
                message:"Unauthorized. Token is invalid"
            })
        }
    })
    next()
}
////////login perawat
controllerPerawat.post('/auth/perawat', (request, result) => {
    let data = request.body
    var username = data.username;
    var password = data.password;
    
    if ( username && password) {
        db.query('SELECT * FROM perawat WHERE username = ? AND password = ?', [username, password],
         function(error, results, fields) {
    
    if (results.length > 0) {
        let token = jwt.sign(data.username + '|' + data.password,scretKey)

            result.json ({
                            success: true,
                            message: 'Login berhasil, hallo!',
                            token: token
                });
    
    } else {
            result.json ({
                            success: false,
                            message: 'username atau password anda salah!!'
        });    
    }
result.end();
            });
        }
    });
    
////Register Perawat
controllerPerawat.post("/tambah/perawat",(req,res)=>{
    var data = {
        username:req.body.username,
        password:req.body.password,
        nama:req.body.nama,
        rs:req.body.rs,
        role:1
    }
let sql = "Insert into perawat set ?"
db.query(sql,data,(err,result)=>{
    if(err) throw err
    
    res.json({
        success:true,
        message:"menambah satu perawat yang aktif"
            })
        }) 
    })
    
/////////////Perawat///////////////
controllerPerawat.get("/tampil/perawat",isAuthorizedForPerawat,(req,res)=>{
    let sql="select * from perawat "
        db.query(sql,(err,result)=>{
            if(err) throw err

           res.json({
                        success:"true",
                        message:"Success",
                        data:result
            })
        })
    })

///////////////////////////////////////////////////////////////
//////Perawat dapat menambah pasien dan penyakitnya/////////
///////////////////////////////////////////////////////////////

controllerPerawat.post("/tambah/perawat/data_pasien",isAuthorizedForPerawat,(req,res)=>{
    var data = {
        username:req.body.username,
        password:req.body.password,
        nama:req.body.nama,
        alamat:req.body.alamat,
        penyakit:req.body.penyakit
    }
let sql = "Insert into pasien set ?"
db.query(sql,data,(err,result)=>{
    if(err) throw err
    
    res.json({
        success:true,
        message:"menambah satu pasien yang hendak berobat"
            })
        }) 
})

controllerPerawat.post("/hapus/perawat/data_pasien",isAuthorizedForPerawat,(req,res)=>{
    let = "Delete * From pasien Where id = "+req.body.id

    db.query(sql,(req,res)=>{
        if(err) throw err

        res.json({
            success:true,
            message:"Pasien telah dihapus"
        })
    })
})

module.exports = controllerPerawat