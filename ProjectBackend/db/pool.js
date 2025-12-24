const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "manager",
  database: "mern_project_db",
  //   database: "sunbeam_learning",
});

//exporting the pool
module.exports = pool;
