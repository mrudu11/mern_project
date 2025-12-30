//importing the express
const express = require("express");
//importing the router
const router = express.Router();
//importing the pool
const pool = require("../db/pool");
const result = require("../utils/result");
const { authUser, checkAuthorization } = require("../utils/auth");

//GET Method

router.get("/", checkAuthorization, (req, res) => {
  const sql = "select * from videos";
  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

// GET all videos OR filter by course_id
router.get("/videos-with-course", authUser, checkAuthorization, (req, res) => {
  const course_id = Number(req.query.course_id);

  console.log("✅ video route hit, course_id =", course_id);

  let sql = `
    SELECT 
      v.video_id,
      v.course_id,
      c.course_name,
      v.title,
      v.description,
      v.youtube_url,
      v.added_at
    FROM videos v
    JOIN courses c ON v.course_id = c.course_id
  `;

  let params = [];

  if (!isNaN(course_id)) {
    sql += " WHERE v.course_id = ?";
    params.push(course_id);
  }

  pool.query(sql, params, (error, data) => {
    if (error) {
      console.log("❌ SQL ERROR:", error);
    }
    res.send(result.createResult(error, data));
  });
});

// GET all videos OR videos by course
router.get(
  "/videos-with-course-name",
  authUser,
  checkAuthorization,
  (req, res) => {
    const { course_id } = req.query;

    let sql = `
      SELECT 
        v.video_id,
        v.course_id,
        c.course_name,
        v.title,
        v.description,
        v.youtube_url,
        v.added_at
      FROM videos v
      JOIN courses c ON v.course_id = c.course_id
    `;

    let params = [];

    // ✅ FILTER ONLY IF course_id IS SENT
    if (course_id) {
      sql += " WHERE v.course_id = ?";
      params.push(course_id);
    }

    pool.query(sql, params, (error, data) => {
      res.send(result.createResult(error, data));
    });
  }
);

//POST Method
router.post("/", authUser, checkAuthorization, (req, res) => {
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

//PUT Method

router.put("/:video_id", authUser, checkAuthorization, (req, res) => {
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
router.delete("/:video_id", authUser, checkAuthorization, (req, res) => {
  const video_id = req.params.video_id; // Get ID from URL

  const sql = "DELETE FROM videos WHERE video_id = ?";

  pool.query(sql, [video_id], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

// GET videos for logged-in student's registered course

router.get(
  "/my-course-videos/:course_id",
  authUser,
  checkAuthorization,
  (req, res) => {
    const course_id = Number(req.params.course_id);
    const studentEmail = req.user.email; // 🔥 from JWT

    const sql = `
    SELECT 
      v.video_id,
      v.title,
      v.description,
      v.youtube_url,
      v.added_at,
      c.course_name
    FROM students sr
    JOIN courses c ON sr.course_id = c.course_id
    JOIN videos v ON c.course_id = v.course_id
    WHERE sr.email = ?
      AND sr.course_id = ?
    ORDER BY v.added_at DESC
  `;

    pool.query(sql, [studentEmail, course_id], (error, data) => {
      if (error) {
        console.log("SQL ERROR:", error);
        return res.send(result.createResult(error));
      }
      res.send(result.createResult(null, data));
    });
  }
);

// GET only active (non-expired) courses
router.get("/courses-active", authUser, checkAuthorization, (req, res) => {
  const sql = `
    SELECT course_id, course_name
    FROM courses
    WHERE CURDATE() BETWEEN start_date AND end_date
  `;

  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

module.exports = router;
