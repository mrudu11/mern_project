import Navbar from "../component/Navbar";
import { getAllCourses } from "../services/adminServices";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { delCourse } from "../services/adminServices";
export default function AllCourses(){

  const location = useLocation()
   const course = location.state.course
   const navigate = useNavigate();
   const update = (course) => {
  navigate("/UpdateCourse", {
    state: {
      courseId: course.course_id,
      course_name: course.course_name,     //changes
      description : course.description,
      fees: course.fees,
      start_date :course.start_date,
      end_date : course.end_date,
      video_expire_days: course.video_expire_days
    },
  });
}
    const [courses,getCourses] = useState([])
        const getCourse = async ()=>{
            const token = sessionStorage.getItem('token')
            const result = await getAllCourses(token);
            console.log(result)
            if(result.status == "success"){
                getCourses(result.data);
            }
          }
          useEffect(()=>{
            getCourse();
          },[])
        const drop = async (cid)=>{
            const token = sessionStorage.getItem('token')
            const result = await delCourse(cid, token)
            
            if(result.status == "success"){

                toast.success("course deleted successfully!!! :)")
            }
            else{
              toast.error("oops!!! failed to delete course :(")
            }
            console.log("drop")
        }
    return <>
    <Navbar/>
    <div className="container">
  <h2>All Available courses</h2>
  {/* <p>The .table-striped class adds zebra-stripes to a table:</p>             */}
  <table className="table table-striped">
    <thead>
      <tr>
        <th>course_id</th>
        <th>course_name</th>
        <th>description</th>
        <th>fees</th>
        <th>start_date</th>
        <th>end_date</th>
        <th>video_expire_days</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
            {courses.map(course => (
              <tr key={course.course_id}>
                <td>{course.course_id}</td>
                <td>{course.course_name}</td>
                <td>{course.description}</td>
                <td>{course.fees}</td>
                <td>{course.start_date}</td>
                <td>{course.end_date}</td>
                <td>{course.video_expire_days}</td>
                <td className="text-center">
                  <button className="btn btn-warning action-btn me-1 d-inline-flex" onclick={() =>update()} >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button className="btn btn-danger action-btn d-inline-flex" onClick={() => drop(course.course_id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
  </table>
</div>
    </>
}