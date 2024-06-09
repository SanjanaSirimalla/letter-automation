import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Outpass from "./forms/Outpass";
import Attendance from "./forms/Attendance";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/outpass" element={<Outpass />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
