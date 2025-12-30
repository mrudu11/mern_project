const express = require("express");
const studentRouter = require("./routes/student");
const coursesRouter = require("./routes/courses");
const vdoRouter = require("./routes/video");
const adminRouter = require("./routes/admin");
const { authUser } = require("./utils/auth");
const cors = require("cors");
//const studRouter = require("./routes/video");

const app = express();

app.use(express.json());
app.use(cors());
// ✅ handle CORS preflight BEFORE auth
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(authUser);
app.use("/students", studentRouter);
app.use("/course", coursesRouter);
app.use("/vdo", vdoRouter);
app.use("/admin", adminRouter);
//app.use("/stud", studRouter);

app.listen(5000, "localhost", () => {
  console.log("server started at port 5000");
});
