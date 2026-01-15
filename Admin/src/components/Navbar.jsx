import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext' // 1. Import Doctor Context
import logo from '../assets_admin/logo.svg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    // 2. Get data from both contexts
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/login') // Redirect to home/login page
        
        // 3. Handle Admin Logout
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }
        
        // 4. Handle Doctor Logout
        if (dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img src={logo} className='w-36 cursor-pointer' alt="HealthNest Admin Logo" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                    {/* 5. Dynamic Label */}
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>

            <button onClick={logout} className='bg-blue-700 text-white text-sm px-10 py-2 rounded-full'>
                Logout
            </button>
        </div>
    )
}

export default Navbar