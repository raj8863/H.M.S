import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets_admin/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="m-5">
      
      {/* --- TOP CARDS SECTION --- */}
      <div className="flex flex-wrap gap-3">
        
        {/* Doctors Card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointment_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointment}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>

      </div>

      {/* --- LATEST BOOKINGS LIST --- */}
      <div className="bg-white">
        
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        {/* List Items */}
        <div className="pt-0 border border-t-0">
          {dashData.latestAppointments.map((item, index) => (
            <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
              
              {/* ⚠️ FIX: Added ?. checks here */}
              <img className="rounded-full w-10" src={item.docData?.image || assets.doctor_icon} alt="" />
              
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.docData?.name || "Unknown Doctor"}</p>
                <p className="text-gray-600">{item.slotDate}</p>
              </div>

              {item.cancelled 
                ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
                : <img onClick={() => cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="cancel" />
              }
              
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;