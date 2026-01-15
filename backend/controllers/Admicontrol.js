import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import cloudinary from "../config/cloudinary.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModels.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "doctors" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

/* ================= ADD DOCTOR ================= */
const addDoctor = async (req, res) => {
  try {
    const {
      name, email, password,
      speciality, degree,
      experience, about, fees, address
    } = req.body;

    const imageFile = req.file;

    if (
      !name || !email || !password ||
      !speciality || !degree || !experience ||
      !about || !fees || !address || !imageFile
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing Details"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });
    }
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    // Parse address
    let parsedAddress;
    try {
      parsedAddress =
        typeof address === "string" ? JSON.parse(address) : address;
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid address format"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(imageFile.buffer);
    const imageUrl = uploadResult.secure_url;

    // Save doctor
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: parsedAddress,
      date: Date.now()
    };

    await doctorModel.create(doctorData);

    res.status(201).json({
      success: true,
      message: "Doctor Added Successfully"
    });

  } catch (error) {
    console.error("ADD DOCTOR ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ================= ADMIN LOGIN ================= */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({ success: true, token });
    }

    res.json({ success: false, message: "Invalid credentials" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= ALL DOCTORS ================= */
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= ALL APPOINTMENTS list================= */
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})

  }
}
/* ================= apointment cancellation================= */
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;     
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {

        console.log(error);


        res.status(500).json({ success: false, message: error.message });
    }
};



/* ================= Dashboard data ================= */
const adminDashboard = async(req, res) => {
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointment: appointments.length,
      patients: users.length,
      // FIX: Use spread operator [...] to clone before reversing
      latestAppointments: [...appointments].reverse().slice(0, 5)
    }
    
    res.json({success: true, dashData})
    
  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false, message: error.message });
  }
}




export { addDoctor, loginAdmin, allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard };
