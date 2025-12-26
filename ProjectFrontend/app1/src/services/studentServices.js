import axios from "axios"

//login user
export async function loginUser(email,password){
    const URL = "http://localhost:4000/admin/login"
    const body = {email,password}
    const response = await axios.post(URL,body)
    return response.data
}

//register user
export async function signupUser(courseId,email,name,mob){
    const URL = "http://localhost:4000/students/register"
    const body = {courseId,email,name,mob}
    const response = await axios.post(URL,body)
    return response.data
}