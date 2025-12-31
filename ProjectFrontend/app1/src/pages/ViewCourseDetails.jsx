import { useState,useEffect } from "react";
import { showDetails } from "../services/adminServices";
import { useLocation } from "react-router";

export default function ViewCourseDetails(){
   const location = useLocation()
   const course = location.state.course
   const navigate = useNavigate();
   const Register = (course) => {
  navigate("/registerToCourse", {
    state: {
      courseId: course.course_id,
      course_name: course.course_name,     //changes
      fees: course.fees
    },
  });
  };
   
    // const [courses,setCourses] = useState([])
    //         const Register = async (cid)=>{
    //             const token = sessionStorage.getItem('token')
    //             const result = await showDetails(cid,token);
    //             console.log(result)
    //             if(result.status == "success"){
    //                 setCourses(result.data);
    //             }
    //           }
              // useEffect(()=>{
              //   setCourses();
              // },[])
    return (
    <div className="container mt-4 d-flex flex-wrap gap-3">
    
        <div className="card" style={{ width: "18rem" }} key={course.course_id}>
          <div className="card-body">
            <h5 className="card-title">{course.course_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{course.description}</h6>
            <p className="card-text"><strong>Start Date:</strong> {course.start_date}</p>
            <p className="card-text"><strong>End Date:</strong> {course.end_date}</p>
            <p className="card-text"><strong>Fees:</strong> ₹{course.fees}</p>
            <a href="#" className="btn btn-success" onClick={()=>{Register(course)}}>Register to Course</a>
          </div>
        </div>
  
    </div>

    )
}