//importing the express
const express = require("express")
//importing the router
const router = express.Router()
//importing the pool
const pool = require("../db/pool")
const result = require("../utils/result")
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
//login for user 
router.post("/login",(req,res)=>{
    const {email,password} = req.body
    const hashedPass = cryptojs.SHA256(password).toString()
    const sql =`select * from users where email = ? and password=?`
    pool.query(sql,[email,hashedPass],(error,data)=>{
        if(error){
            res.send(result.createResult(error))
        }
        else if(data.length == 0){
            res.send(result.createResult("invalid email or password"))
        }
        else{
             const user = data[0]
             const payload ={
                email : user.email,
                role : user.role
             }
             const token =jwt.sign(payload,config.secret);
             const userdata = {
                name : user.name,
                role : user.role,
                token
             }
             res.send(result.createResult(null,userdata));
        }
    })
})

//get courses for user
router.get("/",(req,res)=>{
    const sql = `select * from courses where end_date>=current_date`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router