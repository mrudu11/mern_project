import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route,Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import { createContext } from 'react'

export const loginContext = createContext();
function App() {
      const [loginStatus,setloginStatus] = useState(false)
      return (<>
      <loginContext.Provider value = {{loginStatus,setloginStatus}}>
      <Routes>
        <Route path="/*" element={<Login />}/>
        <Route path="/home" element={loginStatus? <Home/> : <Navigate to="/"/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </loginContext.Provider>
      </>)

}

export default App


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

