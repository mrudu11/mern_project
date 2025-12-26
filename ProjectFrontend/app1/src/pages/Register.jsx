import { useState } from "react";
import Navbar from "../component/Navbar";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { signupUser } from "../services/studentServices";

export default function Register(){

    const [courseId,setcourseId] = useState('')
    const [email,setEmail] = useState('')
    const [Name,setName] = useState('')
    const [mob,setMob] = useState('')

    const navigate = useNavigate()

    const signup =  async(event)=>{
        if(courseId == ""){
            console.log("sdfghj")
           toast.warn("dfgh ")
        }
        if(email == ""){
            toast.warn("Enter email")
        }
        if(Name == ""){
            toast.warn("Enter Name")
        }
        if(mob == ""){
            toast.warn("Enter mob")
        }
        else{
            const result = await signupUser(courseId,email,Name,mob)
            if(result.status == "success"){
                 console.log("succseed")
                toast.success("Registration successful")
                navigate("/")
            }
            else{
            console.log("no successss")
                toast.error(result.error)
            }
        }
    }
    return (
        <div className='container w-50'>
            <div className=" mt-3 mb-3">
                <label htmlFor="courseId" className="form-label">CourseId</label>
                <input type="text" className="form-control" id="courseId" placeholder="Enter courseId" onChange={event => setcourseId(event.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="inputemail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputemail" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Enter Name" onChange={e => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="inputMob" className="form-label">Mobile Number </label>
                <input type="tel" className="form-control" id="inputMob" placeholder="Enter mobile number" onChange={e => setMob(e.target.value)} />
            </div>

            <div className="mb-3">
                <button className="btn btn-success" onClick={signup}>SignUp</button>
            </div>

            <div>
                Doyou already have account? then to login <Link to='/' >Click Here</Link>
            </div>
        </div>
    )
}