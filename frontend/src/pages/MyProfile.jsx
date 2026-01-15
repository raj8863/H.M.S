import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfile } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(false);

  // 1. LOADING STATE: Prevent blank screen while data fetches
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-semibold">Loading Profile...</p>
      </div>
    );
  }

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      if (image) formData.append('image', image);

      // ⚠️ FIX: Changed 'atoken' to 'token'
      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token: token } });
      if (data.success) {
        toast.success(data.message);
        await loadUserProfile();
        setIsEditing(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'line1' || name === 'line2') {
      setUserData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        {/* Profile Image & Name */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-300 object-cover"
            />
            {isEditing && (
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:bg-blue-600 transition"
                title="Change Profile Picture"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            )}
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="text-center font-semibold text-gray-800 border p-1 rounded"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="text-center text-gray-600 border p-1 rounded"
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
            </>
          )}
        </div>

        {/* Profile Details */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="border p-1 rounded w-[60%] text-right"
              />
            ) : (
              <span>{userData.phone}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            {isEditing ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                className="border p-1 rounded w-[60%] text-right"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <span>{userData.gender}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date of Birth:</span>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleInputChange}
                className="border p-1 rounded w-[60%] text-right"
              />
            ) : (
              <span>
                 {userData.dob ? new Date(userData.dob).toLocaleDateString() : 'Not set'}
              </span>
            )}
          </div>

          <div>
            <p className="font-medium">Address:</p>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="line1"
                  value={userData.address?.line1 || ''}
                  onChange={handleInputChange}
                  className="text-gray-600 border p-1 rounded w-full mt-1"
                />
                <input
                  type="text"
                  name="line2"
                  value={userData.address?.line2 || ''}
                  onChange={handleInputChange}
                  className="text-gray-600 border p-1 rounded w-full mt-1"
                />
              </>
            ) : (
              <>
                <p className="text-gray-600 ml-2">{userData.address?.line1}</p>
                <p className="text-gray-600 ml-2">{userData.address?.line2}</p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center pt-4">
          {isEditing ? (
            <button
              type="button"
              onClick={updateUserProfileData}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;