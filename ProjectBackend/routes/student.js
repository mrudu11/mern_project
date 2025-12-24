//importing the express
const express = require("express")
//importing the router
const router = express.Router()
//importing the pool
const pool = require("../db/pool")
const result = require("../utils/result")
const cryptojs = require("crypto-js")

//student register to particular course 
router.post("/register", (req, res) => {
    const { courseId, email, name, mobileNo } = req.body
    const sql = `insert into student(course_id, email,name, mobile_no) values(?,?,?,?)`
    const sql2 = `SELECT 1 FROM users WHERE email = ? LIMIT 1;`
    const sql3 = `insert into users (email,password) values(?,?)`
    pool.query(sql2, [email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error))
        }
        if (data.length == 0) {
             const hashedPass = cryptojs.SHA256("sunbeam").toString()
            // res.send(result.createResult("email not found"))
            pool.query(sql3, [email,hashedPass ] , (error, data) => {
                // res.send(result.createResult(error,data))
                if (error) {
                   return res.send(result.createResult(error))
                }
                pool.query(sql, [courseId, email, name, mobileNo], (error, data) => {
                    return res.send(result.createResult(error, data))
                })

            })
            // pool.query(sql,[courseId, email,name, mobileNo],(error,data)=>{
            //     res.send(result.createResult(error,data))
            // })
        }
        else{
            pool.query(sql,[courseId, email,name, mobileNo],(error,data)=>{
               return res.send(result.createResult(error,data))
            })
        }
    })
})

//change password
router.post("/change", (req, res) => {
    const email = req.headers.email
    const {  newPassword, confirmPassword } = req.body
    const sql = `update users set password = ? where email = ?`
    if (newPassword == confirmPassword) {
         const hashedPass = cryptojs.SHA256(newPassword).toString()
        pool.query(sql, [hashedPass, email], (error, data) => {
            res.send(result.createResult(error, data))
        })
    }
    else {
        res.send(result.createResult("Please enter same new password"))
    }
})

//get courses
router.get("/getCourseStudent", (req, res) => {
    const email = req.headers.email
    const sql = `select * from courses c inner join student s on c.course_id = s.course_id where email = ?`
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})
module.exports = router