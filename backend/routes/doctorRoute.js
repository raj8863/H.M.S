import express from 'express'
// 1. Import appointmentCancel from DoctorController, not AdminController
import { 
    appointmentComplete, 
    appointmentsDoctor, 
    doctorList, 
    loginDoctor, 
    doctorDashboard,
    appointmentCancel ,
    doctorProfile, updateDoctorProfile
} from '../controllers/DoctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)

// 2. Changed POST to GET to match frontend axios call
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

export default doctorRouter