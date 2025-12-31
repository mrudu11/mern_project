import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { MyCourses } from "../services/studentServices";

export default function MyRegCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    async function fetchCourses() {
      const result = await MyCourses(token);
      if (result.status === "success") {
        setCourses(result.data);
      }
    }

    fetchCourses();
  }, []);

  const selectedCourse = courses.find(
    (c) => c.course_id == selectedCourseId
  );

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h4 className="text-center">My Registered Courses</h4>

        <select className="form-select" onChange={(e) => setSelectedCourseId(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.course_id} value={c.course_id}>
              {c.course_name}
            </option>
          ))}
        </select>

        {selectedCourse && (
          <div className="card mt-4">
            <div className="card-body">
              <h5>{selectedCourse.course_name}</h5>
              <p>{selectedCourse.description}</p>
              <p>₹{selectedCourse.fees}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
