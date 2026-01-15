import React, { useContext, useState } from 'react'
import { assets } from "../../assets_admin/assets";
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)


  const onSubmitHandler = async (event) => {
  event.preventDefault()

  try {
    if (!docImg) {
      return toast.error('Image not selected')
    }

    if (!aToken) {
      return toast.error('Authentication failed. Please login again.')
    }

    const formData = new FormData()

    formData.append('image', docImg)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('experience', experience)
    formData.append('fees', Number(fees))
    formData.append('about', about)
    formData.append('speciality', speciality)
    formData.append('degree', degree)
    formData.append(
      'address',
      JSON.stringify({ line1: address1, line2: address2 })
    )

    // Debug
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }

    const { data } = await axios.post(
      backendUrl.replace(/\/$/, '') + '/api/admin/add-doctor',
      formData,
      {
        headers: {
          Authorization: `Bearer ${aToken}`
        }
      }
    )

    if (data.success) {
      toast.success(data.message)

      // reset
      setDocImg(false)
      setName('')
      setEmail('')
      setPassword('')
      setFees('')
      setAbout('')
      setDegree('')
      setAddress1('')
      setAddress2('')
    } else {
      toast.error(data.message)
    }

  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.message || error.message)
  }
}




    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            {/* Title */}
            <p className="mb-4 text-xl font-semibold text-gray-800">
                Add Doctor
            </p>

            {/* Card */}
            <div className="bg-white px-8 py-8 border rounded-lg w-full max-w-5xl max-h-[80vh] overflow-y-auto">

                {/* Upload Image */}
                <div className="flex items-center gap-6 mb-8">
                    <label
                        htmlFor="doc-img"
                        className="cursor-pointer flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition"
                    >
                        <img
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt="Upload"
                            className="w-12 opacity-70"
                        />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />

                    <p className="text-sm text-gray-500">
                        Upload doctor <br /> picture
                    </p>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Column */}
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm font-medium mb-1">Your Name</p>
                            <input
                                onChange={(e) => setName(e.target.value)} value={name}
                                type="text"
                                placeholder="Name"
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-1">Doctor Email</p>
                            <input
                                onChange={(e) => setEmail(e.target.value)} value={email}
                                type="email"
                                placeholder="singh@gmail.com"
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-1">Doctor Password</p>
                            <input
                                onChange={(e) => setPassword(e.target.value)} value={password}
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-1">Experience</p>
                            <select
                                onChange={(e) => setExperience(e.target.value)} value={experience}
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="7 Years">7 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 years</option>
                                <option value="10 Years">10 years</option>
                            </select>
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-1">Fees</p>
                            <input
                                onChange={(e) => setFees(e.target.value)} value={fees}
                                type="number"
                                placeholder="Your fees"
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm font-medium mb-1">Speciality</p>
                            <select
                                onChange={(e) => setSpeciality(e.target.value)} value={speciality}
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>General Physician</option>
                                <option>Gynecologist</option>
                                <option>Dermatologist</option>
                                <option>Pediatrician</option>
                                <option>Neurologist</option>
                                <option>Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-1">Education</p>
                            <input
                                onChange={(e) => setDegree(e.target.value)} value={degree}
                                type="text"
                                placeholder="Education"
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-1">Address</p>
                            <input
                                onChange={(e) => setAddress1(e.target.value)} value={address1}
                                type="text"
                                placeholder="Address line 1"
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm mb-2 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                onChange={(e) => setAddress2(e.target.value)} value={address2}
                                type="text"
                                placeholder="Address line 2"
                                required
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* About Doctor */}
                <div className="mt-6">
                    <p className="text-sm font-medium mb-1">About Doctor</p>
                    <textarea
                        onChange={(e) => setAbout(e.target.value)} value={about}
                        rows={5}
                        placeholder="Write about doctor"
                        required
                        className="w-full border rounded-md px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition"
                >
                    Add Doctor
                </button>
            </div>
        </form>
    )
}

export default AddDoctor
