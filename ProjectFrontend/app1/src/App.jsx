import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AddCourse from "./pages/AddCourse";
import AllCourses from "./pages/AllCourses";
import { createContext } from "react";
import ViewCourseDetails from "./pages/ViewCourseDetails";
import AllVideos from "./pages/AllVideo";
import AdminRoute from "./guards/AdminRoutes";
import ChangePassword from "./pages/ChangePassword";
import UpdateProfile from "./pages/UpdateProfile";
import GetAllStudents from "./pages/GetAllStudent";


export const loginContext = createContext();
function App() {
  const [loginStatus, setloginStatus] = useState(false);
  return (
    <>
      <loginContext.Provider value={{ loginStatus, setloginStatus }}>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route
            path="/home"
            element={loginStatus ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/addCourse"
            element={loginStatus ? <AddCourse /> : <Navigate to="/" />}
          />
          <Route
            path="/getCourses"
            element={loginStatus ? <AllCourses /> : <Navigate to="/" />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/view"
            element={loginStatus ? <ViewCourseDetails /> : <Navigate to="/" />}
          />
          <Route path="/changepassword" element={<ChangePassword />}/>
          <Route path="/updateprofile" element={<UpdateProfile />}/>
          <Route path="/getallstudent" element={<GetAllStudents />}/>

          {/* <Route path="/admin/videos" element={<AllVideos />} /> */}
          <Route
            path="/admin/videos"
            element={
              <AdminRoute>
                <AllVideos />
              </AdminRoute>
            }
          />
        </Routes>
      </loginContext.Provider>
    </>
  );
}

export default App;

// import { Route, Routes } from "react-router"
// import Home from "./pages/Home"
// //import Profile from "./pages/Profile"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import { ToastContainer } from 'react-toastify'

// // functional components
// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/*" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/home" element={<Home />} />
//         {/* <Route path="/profile" element={<Profile />} /> */}
//       </Routes>
//       <ToastContainer />
//     </>
//   )
// }

// export default App
