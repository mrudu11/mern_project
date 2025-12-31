import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import { Regcourses } from "../services/studentServices";
import { useLocation } from "react-router-dom";


export default function RegisterToCourses() {

  const location = useLocation();
  const course = location.state.course
   const navigate = useNavigate();
   const Mycourse = (course) => {
  navigate("/registerToCourse", {
    state: {
      courseId: course.course_id,
      course_name: course.course_name,     //changes
      fees: course.fees
    },
  });
  };
   

  if (!location.state) {
    return (
      <>
        <Navbar />
        <h4 className="text-center mt-5">
          Please select a course first
        </h4>
      </>
    );
  }

  const { courseId, course_name, fees } = location.state || {};
  console.log("STATE:", location.state);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const RegToCou = async () => {
  console.log("TOKEN FROM SESSION:", sessionStorage.getItem("token"));


    if (!name) return toast.warn("Enter full name");
    if (!email) return toast.warn("Enter email");
    if (!mobile) return toast.warn("Enter mobile number");

    const token = sessionStorage.getItem("token");

    const result = await Regcourses(courseId, email, name, mobile, token);

    if (result.status === "success") {
      toast.success("Registered successfully");
    } else {
      toast.warn(result.error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        {/* Course Info */}
        <table className="table table-bordered mb-4">
          <tbody>
            <tr>
              <th>Course Name</th>
              <td>{course_name}</td>
            </tr>
            <tr>
              <th>Fees (₹)</th>
              <td>{fees}</td>
            </tr>
          </tbody>
        </table>

        {/* Registration Form */}
        <div className="card shadow">
          <div className="card-body">
            <h4 className="text-center mb-4">Register to Course</h4>

            <input
              className="form-control mb-3"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-control mb-3"
              placeholder="Mobile"
              onChange={(e) => setMobile(e.target.value)}
            />

            <button className="btn btn-info w-100" onClick={() => {Mycourse(course)}}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}