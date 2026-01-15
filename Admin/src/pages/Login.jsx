import React, { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl, aToken } = useContext(AdminContext)
  const { setDToken, dToken } = useContext(DoctorContext)
  
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.removeItem('dToken')
          setDToken('') 
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.removeItem('aToken') 
          setAToken('')
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (aToken) {
      navigate('/admin-dashboard')
    } else if (dToken) {
      navigate('/doctor-dashboard')
    }
  }, [aToken, dToken, navigate])

  return (
    // ⚠️ FIXED: Added 'w-full' so it spans the whole screen width to center correctly
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center w-full">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md text-base transition-all">
          Login
        </button>

        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span
              className="text-blue-700 underline cursor-pointer"
              onClick={() => { setState('Doctor'); setEmail(''); setPassword(''); }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              className="text-blue-700 underline cursor-pointer"
              onClick={() => { setState('Admin'); setEmail(''); setPassword(''); }}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login