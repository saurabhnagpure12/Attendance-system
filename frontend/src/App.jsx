import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Blogs from "./pages/blogs/Blogs";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import ScheduleManagement from "./pages/Schedule/ScheduleManagement";
import StudentManagement from "./pages/Students/StudentManagement";
import ClassManagement from "./pages/class/Class";
import AttendanceForm from "./pages/Attendence/AttendanceForm";

function App() {
	const { authUser } = useAuthContext();
	return (<><Home/>
	<div>Yeap</div>
		<div className='p-4 h-screen flex items-center justify-center'>

			<Routes>
			<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
			
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
          <Route path='/blogs' element={authUser ? <Blogs /> : <Navigate to="/login" />} />
          <Route path='/attendance' element={authUser ? <AttendanceForm /> : <Navigate to="/login" />} />
          <Route path='/schedule' element={authUser ? <ScheduleManagement /> : <Navigate to="/login" />} />
          <Route path='/student' element={authUser ? <StudentManagement /> : <Navigate to="/login" />} />
          <Route path='/class' element={authUser ? <ClassManagement /> : <Navigate to="/login" />} />
    
			</Routes>
			<Toaster />
		</div></>
	);
}

export default App;
