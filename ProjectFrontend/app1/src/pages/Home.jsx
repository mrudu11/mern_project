import { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { getAllCourses } from "../services/studentServices"
import { useNavigate } from "react-router"
import NavbarAdmin from "../component/NavbarAdmin"

export default function Home(){
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
      // const view = async ()=>{
      //   const token = sessionStorage.getItem('token')
      //   const result = await 
      // }
      const navigate = useNavigate();
      // const view = ()=>{
      //   navigate('/view', {state: {}})
      // }
    return <>
    <Navbar/>
    <NavbarAdmin />
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
                  <button className="btn btn-success" onClick={()=>  navigate('/view', {state: {course}})}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
  </table>
</div>
    </>
}