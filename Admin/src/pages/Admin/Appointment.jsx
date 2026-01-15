import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const Appointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div 
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' 
            key={index}
          >
            <p className='max-sm:hidden'>{index + 1}</p>
            
            <div className='flex items-center gap-2'>
              {/* FIX: Ensure src is not empty string */}
              <img className='w-8 rounded-full' src={item.userData?.image || assets.upload_area} alt="" /> 
              <p>{item.userData?.name || "Unknown"}</p>
            </div>

            <p className='max-sm:hidden'>
              {/* FIX: Validate Date before calculating age to avoid NaN */}
              {item.userData?.dob ? calculateAge(item.userData.dob) : "NA"}
            </p>
       
            <p>{item.slotDate}, {item.slotTime}</p>
            
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData?.image || assets.upload_area} alt="" /> 
              <p>{item.docData?.name || "Unknown"}</p>
            </div>
            
            <p>{item.amount}</p>
            
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointment