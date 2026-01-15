import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [doctors, setDoctors] = useState([]);
  
  // Initialize token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
  
  // User Data State
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfile = async () => {
    try {
      // HEADER MUST BE 'token' to match backend
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token: token } 
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfile
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  // Whenever token changes (Login/Logout/Refresh), update localStorage and fetch Profile
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Save to local storage
      loadUserProfile(); // Fetch user data immediately
    } else {
      localStorage.removeItem('token'); // Clear from local storage
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;