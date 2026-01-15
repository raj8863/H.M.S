import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : false)
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData]=useState(false)


    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } })
            if (data.success) {
                // Note: We reverse the array here to show newest first
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/complete-appointment', 
                { appointmentId },  
                { headers: { dToken } }
            )
            
            if (data.success) {
                toast.success(data.message)
                
                // Update local state directly (Faster than fetching all again)
                setAppointments(prev => prev.map(item => 
                    item._id === appointmentId ? { ...item, isCompleted: true } : item
                ))

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

   
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/cancel-appointment', 
                { appointmentId }, 
                { headers: { dToken } }
            )
            
            if (data.success) {
                toast.success(data.message)
                
                // Update local state directly so UI turns Red instantly
                setAppointments(prev => prev.map(item => 
                    item._id === appointmentId ? { ...item, cancelled: true } : item
                ))
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData=async()=>{
        try {
            
            const {data}=await axios.get(backendUrl +'/api/doctor/dashboard',{headers:{dToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            }
            else{
                toast.error(data.message)

            }

        } catch (error) {
             console.log(error)
            toast.error(error.message)
        }
    }


    const value = {
        dToken, setDToken, backendUrl,
        appointments, setAppointments,
        getAllAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,setDashData,getDashData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider