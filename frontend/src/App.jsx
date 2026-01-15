import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyAppointments from "./pages/MyAppointments";

import Login from "./pages/Login";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      {/* ✅ Toast container */}
      <ToastContainer />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/myappointments" element={<MyAppointments />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/login" element={<Login/>} />
        
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
