import { updateCourse } from "../services/adminServices"
import { useState } from "react"
import { toast } from "react-toastify"
export default function UpdateCourse(){
    const [course_name,setCourseName] = useState('')
        const [description,setDescription] = useState('')
        const [fees,setFees] = useState(0)
        const [start_date,setStartDate] = useState('')
        const [end_date,setEndDate] = useState('')
         const [video_expire_days,setDays] = useState('')
    const update = async() =>{
         if(course_name == ""){
                    toast.warn("please enter course name")
                }
                else if(description == ""){
                    toast.warn("please enter description")
                }
                else if(fees == ""){
                    toast.warn("please enter fees")
                }
                else if(start_date == ""){
                    toast.warn("please enter startDate")
                }
                else if(end_date == ""){
                    toast.warn("please enter endDate")
                }
                else if(video_expire_days == ""){
                    toast.warn("please enter video expire days")
                }
                else{
                            const token = sessionStorage.getItem('token')
                            const result = await updateCourse(course_name,description,fees,start_date,end_date,video_expire_days,token)
                            if(result.status == "success"){
                                console.log("hello")
                                toast.success("Course updated successfully..:)")
                            }
                            else{
                                console.log("hii")
                                console.log(result.data)
                                toast.warn(result.error)
                                //toast.warn("unauthorized access")
                            }
                        }
    }
    return (
        <div className='container w-50'>
            <div className=" mt-3 mb-3">
                <label htmlFor="inputName" className="form-label">Course Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter Course Name" onChange={e => setCourseName(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label htmlFor="inputDescription" className="form-label">Description</label>
                <input type="Description" className="form-control" id="inputDescription" placeholder="Enter Description" onChange={e => setDescription(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label htmlFor="inputfees" className="form-label">fees</label>
                <input type="number" className="form-control" id="inputfees" placeholder="Enter fees" onChange={e => setFees(e.target.value)} required />
            </div>

            <div className="mb-3">
                <label htmlFor="inputStartDate" className="form-label">StartDate</label>
                <input type="date" className="form-control" id="inputStartDate" placeholder="Enter Start Date" onChange={e => setStartDate(e.target.value)} required />
            </div>

             <div className="mb-3">
                <label htmlFor="inputEndDate" className="form-label">EndDate</label>
                <input type="date" className="form-control" id="inputEndDate" placeholder="Enter End Date" onChange={e => setEndDate(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="inputDays" className="form-label">Video Expire Days</label>
                <input type="number" className="form-control" id="inputDays" placeholder="Enter Video Expire Days" onChange={e => setDays(e.target.value)} required />
            </div>

            <div className="mb-3">
                <button className="btn btn-success" onClick={update}>Update course</button>
            </div>
        </div>
    )
}