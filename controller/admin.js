const express = require("express")
const controllerAdmin = express.Router()
const jwt = require("jsonwebtoken")
const scretKey = "thisIsVerySecretKeyAdmin"

const isAuthorizedForAdmin = (req,result,next)=>{
    if(typeof(req.headers["x-api-key"])=="undefined"){
        return result.status(403).json({
            success:false,
            message:"Unauthorized. Token is not provide"
        })
    }
    let token = req.headers["x-api-key"]

    jwt.verify(token,scretKey,(err,decoded)=>{
        if(err){
            return result.status(401).json({
                success:false,
                message:"Unauthorized. Token is invalid"
            })
        }
    })
    next()
}

controllerAdmin.post("/auth/admin",(req,res)=>{
    let data = req.body
    var username = req.body.username
    var password = req.body.password

    if(username&&password){
        db.query("SELECT * FROM admin WHERE username = ? AND password = ? ",[username,password],
        function(error,result,fields){
            if(result.length > 0){
                let token = jwt.sign(data.username + '|' + data.password,scretKey)
    
            res.json ({
                            success: true,
                            message: 'Login berhasil, hallo!',
                            token: token
                });
    
    } else {
            res.json ({
                        success: false,
                        message: 'username atau password anda salah!!'
        });    
    
                }
            res.end()
            })
     }
})
///////////////////////////////////////////////
//////////Admin memiliki akses perawat/////////
///////////////////////////////////////////////
controllerAdmin.get("/admin/tampil/perawat",isAuthorizedForAdmin,(req,res)=>{
    let sql = "SELECT * FROM perawat"
    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success: true,
            message:"Perawat",
            data : result
        })
    })
})

controllerAdmin.get("/admin/detail/perawat",(req,res)=>{
    let sql = "SELECT * FROM perawat Where id = " + req.body.id
    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success:true,
            data:result
        })
    })
})


controllerAdmin.post("/admin/tambah/perawat",isAuthorizedForAdmin,(req,res)=>{
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

controllerAdmin.post("/admin/edit/perawat",isAuthorizedForAdmin,(req,res)=>{
    let sql = "Update perawat SET username = '"+req.body.username+"',password='"+req.body.password+
    "',nama='"+req.body.nama+"',rs='"+req.body.rs+"',role='"+1+"'Where id ="+req.body.id
    let query = db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success:true,
            message: "data telah berhasil diubah",
            data:result
        })
    })
})

///////////////////////////ADMIN MEMILIKI AKSES MENGAKTIFKAN PERAWAT YANG TELAH BERTUGAS///////
controllerAdmin.post("/admin/mengaktifkan_perawat",isAuthorizedForAdmin,(req,res)=>{
    
    let sql = "Update perawat Set role = role + 1 Where id = "+ req.body.id

    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success : true,
            message:"Perawat Telah di aktifkan kembali "
        })
    })

})
////////////////////////ADMIN MEMILIKI AKSES MELIBURKAN PERAWAT SEMENTARA DARI TUGAS/////////////
controllerAdmin.post("/admin/meliburkan_perawat",isAuthorizedForAdmin,(req,res)=>{
    let sql = "Update perawat Set role = role - 1 Where id = "+ req.body.id

    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success : true,
            message:"Perawat Telah di liburkan dengan kode perawat" + req.body.id
        })
    })
})
    
controllerAdmin.post("/admin/hapus/perawat",isAuthorizedForAdmin,(req,res)=>{
    let sql = "delete from perawat where id = " + req.body.id

    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success:true,
            message:"Perawat berhasil dihapus"
        })
    })
})


////////////////////////////////////////////
///////Admin memiliki akses pasien/////////////
////////////////////////////////////////////
controllerAdmin.get("/admin/tampil/pasien",isAuthorizedForAdmin,(req,res)=>{
    let sql = "SELECT * FROM pasien"
    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success: true,
            message:"Pasien",
            data : result
        })
    })
})

controllerAdmin.get("/admin/detail/pasien",isAuthorizedForAdmin,(req,res)=>{
    let sql = "Select * From pasien Where id=" + req.body.id

    db.query(sql,(err,result)=>{
        res.json({
            success:true,
            message:"Detail data pasien",
            data:result
        })
    })
})

controllerAdmin.post("/admin/tambah/pasien",isAuthorizedForAdmin,(req,res)=>{
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
        message:"menambah satu pasien"
            })
        }) 
    })

controllerAdmin.post("/admin/edit/pasien",isAuthorizedForAdmin,(req,res)=>{
    let sql = "Update pasien SET username = '"+req.body.username+"',password='"+req.body.password+
    "',nama='"+req.body.nama+"',alamat='"+req.body.alamat+"',penyakit='"+req.body.penyakit+"'Where id ="+req.body.id
    let query = db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success:true,
            message: "data pasien telah berhasil diubah oleh admin",
            data:result
        })
    })
})
    
controllerAdmin.post("/admin/hapus/pasien",isAuthorizedForAdmin,(req,res)=>{
    let sql = "delete from pasien where id = " + req.body.id

    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success:true,
            message:"Perawat berhasil dihapus oleh admin"
        })
    })
})
module.exports = controllerAdmin
