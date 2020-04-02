const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mysql = require("./db/mysql")
const port = 3000
const jwt = require("jsonwebtoken")

const controllerPerawat = require("./controller/perawat")
const controllerPasien = require("./controller/pasien")
const controllerAdmin = require("./controller/admin")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))

app.use("/",controllerPerawat)
app.use("/",controllerPasien)
app.use("/",controllerAdmin)

app.listen(port, () => console.log(`Example app listening on port port!`))