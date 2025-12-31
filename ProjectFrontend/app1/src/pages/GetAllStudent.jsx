import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";
import NavbarAdmin from "../component/NavbarAdmin";
import { showCourses, getStudentsByCourseName } from "../services/adminServices";

function GetAllStudents() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");

  const token = sessionStorage.getItem("token");

  // GET ALL STUDENTS
  const getAllStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/students",
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.status === "success") {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  // GET COURSES
  const getCourses = async () => {
    const result = await showCourses(token);
    if (result.status === "success") {
      setCourses(result.data);
    }
  };

  // HANDLE DROPDOWN CHANGE
  const handleCourseChange = async (e) => {
    const courseName = e.target.value;
    setSelectedCourse(courseName);

    if (courseName === "All") {
      getAllStudents();
    } else {
      const result = await getStudentsByCourseName(courseName, token);
      if (result.status === "success") {
        setStudents(result.data);
      }
    }
  };

  useEffect(() => {
    getAllStudents();
    getCourses();
  }, []);

  return (
    <>
      <Navbar />
      <NavbarAdmin />

      <div className="container mt-4">
        <h3 className="text-center mb-4">All Students</h3>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Filter by Course</label>
            <select
              className="form-select"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="All">All Courses</option>
              {courses.map((course) => (
                <option
                  key={course.course_id}
                  value={course.course_name}
                >
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Mobile No</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.reg_no}>
                    <td>{student.reg_no}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course_name}</td>
                    <td>{student.mobile_no}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default GetAllStudents;
