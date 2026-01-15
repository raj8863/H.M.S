import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets"; // Assuming you have a default avatar here if needed

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary cursor-pointer">
          HealthNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/doctors" className="hover:text-primary transition">Doctors</Link>
          <Link to="/about" className="hover:text-primary transition">About</Link>
          <Link to="/contacts" className="hover:text-primary transition">Contact</Link>

          {token && userData ? (
            <div className="relative group">
              {/* Profile Icon Only (Name Removed) */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={userData.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">
                  {/* Name Moved Here */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 truncate">{userData.name}</p>
                    <p className="text-xs text-gray-500 truncate">User</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/myappointments"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                  >
                    My Appointments
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-light transition shadow-md"
            >
              Create Account
            </Link>
          )}
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 p-2 focus:outline-none"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Fixed CSS (Full Width) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-lg ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col text-base font-medium text-gray-700">
          <Link onClick={() => setMenuOpen(false)} to="/" className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/doctors" className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50">Doctors</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about" className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contacts" className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50">Contact</Link>

          {token && userData ? (
            <div className="bg-gray-50">
              <div className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</div>
              <Link onClick={() => setMenuOpen(false)} to="/profile" className="block px-6 py-3 hover:text-primary">My Profile</Link>
              <Link onClick={() => setMenuOpen(false)} to="/myappointments" className="block px-6 py-3 hover:text-primary">My Appointments</Link>
              <button onClick={logoutHandler} className="w-full text-left px-6 py-4 text-red-500 hover:bg-red-50 font-semibold">Logout</button>
            </div>
          ) : (
            <div className="p-6">
              <Link
                onClick={() => setMenuOpen(false)}
                to="/login"
                className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;