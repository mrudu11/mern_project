//importing the express
const express = require("express")
//importing the router
const router = express.Router()
//importing the pool
const pool = require("../db/pool")
const result = require("../utils/result")
const { checkAuthorization } = require("../utils/auth");
// add course
router.post("/add/:cid",checkAuthorization,(req,res)=>{
    const cid = req.params.cid
    const {course_name,description,fees,start_date,end_date,video_expire_days} = req.body
    const sql = `insert into courses values(?,?,?,?,?,?,?)`
    pool.query(sql,[cid,course_name,description,fees,start_date,end_date,video_expire_days],(error,data)=>{
        res.send(result.createResult(error,data))
    }) 
})
//delet course 
router.delete("/delete/:cid",checkAuthorization,(req,res)=>{
    const cid = req.params.cid
    const sql = `delete from courses where course_id = ?`
    pool.query(sql,[cid],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})


//update courses
router.put('/update/:course_id', checkAuthorization,(req, res) => {
    const { course_id } = req.params;
    const { course_name, description, fees, start_date, end_date, video_expire_days } = req.body;

    const sql = `
        UPDATE courses
        SET course_name = ?, description = ?, fees = ?, start_date = ?, end_date = ?, video_expire_days = ?
        WHERE course_id = ?
    `;

    pool.query(
        sql,
        [course_name, description, fees, start_date, end_date, video_expire_days, course_id],
        (error, data) => {
            res.send(result.createResult(error, data));
        }
    );
});

//get all courses on the date 
router.get("/all_courses",checkAuthorization,(req,res)=>{
    const {startDate, endDate} = req.query
    const sql = `select * from courses where start_date >= ? and end_date <= ?`
    pool.query(sql,[startDate,endDate],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

// sign up for user
module.exports = router 