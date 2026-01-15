import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
      {doctors.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="border  border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
          >
            <img className="bg-indigo-50 group-hover:bg-blue-400 transition-all duration-500" src={doctor.image} alt="" />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium"><strong>Name:</strong> {doctor.name}</p>
              <p className="text-zinc-600 text-sm"><strong>Speciality:</strong> {doctor.speciality}</p>
              <div className="mt-2 flex item-center gap-1 text-sm">
                <input onChange={()=> changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} />
                <p>Available</p>
              </div>
            </div>

          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default DoctorList;
