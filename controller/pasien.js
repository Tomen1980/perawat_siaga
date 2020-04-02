const express = require("express")
const controllerPasien = express.Router()

const jwt = require("jsonwebtoken")
const scretKey = "thisIsVerySecretKeyPasien"

////////pasien
const isAuthorizedForPasien = (req,result,next)=>{
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

/////////login pasien
controllerPasien.post('/auth/pasien', (request, res) => {
    let data = request.body
    var username = data.username;
    var password = data.password;

if ( username && password) {
db.query('SELECT * FROM pasien WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {

if (results.length > 0) {
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
res.end();
    });
 }
});

controllerPasien.get("/tampil/pasien/perawat_aktif",isAuthorizedForPasien,(req,res)=>{
    let sql ="Select * from perawat Where role = 1"
    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success:true,
            message:"Tampil perawat yang siap di request",
            data : result
        })
    })
})

controllerPasien.post("/pilih_perawat/pasien",(req,res)=>{
    let sql = "Update perawat Set role = role - 1 Where id = "+ req.body.id

    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success : true,
            message:"Perawat Telah di pilih "
        })
    })
})

controllerAdmin.post("/pasien/mengaktifkan_perawat",isAuthorizedForAdmin,(req,res)=>{
    
    let sql = "Update perawat Set role = role + 1 Where id = "+ req.body.id

    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json({
            success : true,
            message:"Perawat Telah datang dan memeriksa "
        })
    })

})

module.exports=controllerPasien