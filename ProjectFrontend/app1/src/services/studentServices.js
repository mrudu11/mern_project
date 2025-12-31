import axios from "axios"

//login user
export async function loginUser(email,password){
    const URL = "http://localhost:5000/admin/login"
    const body = {email,password}
    const response = await axios.post(URL,body)
    return response.data
}

//register user
export async function signupUser(courseId,email,name,mob){
    const URL = "http://localhost:5000/students/register"
    const body = {courseId,email,name,mob}
    const response = await axios.post(URL,body)
    return response.data
}

//all available courses (home page)
export async function getAllCourses(token){
    const URL = "http://localhost:5000/admin/"
    //const headers = {token}
    const response = await axios.get(URL,{headers : {token}})
    return response.data
}

//change password

export async function changePassword(newPassword) {
  const token = sessionStorage.getItem("token");

  const response = await axios.put(
    "http://localhost:5000/students/changePassword",
    { password: newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}