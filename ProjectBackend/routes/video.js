//importing the express
const express = require("express");
//importing the router
const router = express.Router();
//importing the pool
const pool = require("../db/pool");
const result = require("../utils/result");
//GET Method

router.get("/", (req, res) => {
  const sql = "select * from videos";
  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

//POST Method
router.post("/", (req, res) => {
  //Destructuring

  const { course_id, title, description, youtube_url, added_at } = req.body;

  const sql = `insert into videos (course_id,title,description,youtube_url,added_at) values (?,?,?,?,?)`;

  pool.query(
    sql,
    [course_id, title, description, youtube_url, added_at],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

router.put("/:video_id", (req, res) => {
  const video_id = req.params.video_id;

  const { course_id, title, description, youtube_url, added_at } = req.body;

  const sql = `
    UPDATE videos
    SET course_id = ?,
        title = ?,
        description = ?,
        youtube_url = ?,
        added_at = ?
    WHERE video_id = ?
  `;

  pool.query(
    sql,
    [course_id, title, description, youtube_url, added_at, video_id],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

// DELETE Method (Delete by video_id)
router.delete("/:video_id", (req, res) => {
  const video_id = req.params.video_id; // Get ID from URL

  const sql = "DELETE FROM videos WHERE video_id = ?";

  pool.query(sql, [video_id], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

/*
  GET students by course id
  URL: /students/:courseId
  Example: /students/1
*/
router.get("/:courseId", (req, res) => {
  const courseId = req.params.courseId;

  if (!courseId) {
    return res.send(result.createResult("courseId is required"));
  }

  const sql = `
    SELECT reg_no, name, email, course_id, mobile_no, profile_pic
    FROM students
    WHERE course_id = ?
  `;

  pool.query(sql, [courseId], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

/*
  GET all videos by course id (path param)
  URL: /video/all-videos/:courseId
  Example: /video/all-videos/1
*/
router.get("/all-videos/:courseId", (req, res) => {
  const courseId = req.params.courseId;

  if (!courseId) {
    return res.send(result.createResult("courseId is required"));
  }

  const sql = `
    SELECT video_id, course_id, title, description, youtube_url, added_at
    FROM videos
    WHERE course_id = ?
  `;

  pool.query(sql, [courseId], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

// // GET students by course id
// // /students/by-course?courseId=1
// router.get("/by-course", (req, res) => {
//   const { courseId } = req.query;

//   if (!courseId) {
//     return res.send(result.createResult("courseId is required"));
//   }

//   const sql = `
//     SELECT reg_no, name, email, course_id, mobile_no, profile_pic
//     FROM students
//     WHERE course_id = ?
//   `;

//   pool.query(sql, [courseId], (error, data) => {
//     res.send(result.createResult(error, data));
//   });
// });

/*
  GET all videos by course id
  URL: /video/all-videos?courseId=1
*/
// router.get("/all-videos", (req, res) => {
//   const { courseId } = req.query;

//   if (!courseId) {
//     return res.send(result.createResult("courseId is required"));
//   }

//   const sql = `
//     SELECT video_id, course_id, title, description, youtube_url, added_at
//     FROM videos
//     WHERE course_id = ?
//   `;

//   pool.query(sql, [courseId], (error, data) => {
//     res.send(result.createResult(error, data));
//   });
// });

module.exports = router;
