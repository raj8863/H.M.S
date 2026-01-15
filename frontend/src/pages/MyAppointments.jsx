import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { jsPDF } from "jspdf"; // Make sure to install: npm install jspdf

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  // Fetch User Appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token: token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel Appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token: token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments(); 
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // --- DOWNLOAD RECEIPT FUNCTION ---
  const downloadReceipt = (appointment) => {
    try {
      const doc = new jsPDF();

      // 1. Header
      doc.setFontSize(22);
      doc.setTextColor(0, 51, 153); // Dark Blue
      doc.text("HealthNest Medical Center", 20, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("123 Wellness Street, Healthy City, USA", 20, 26);
      doc.text("Phone: (555) 123-4567 | Email: support@healthnest.com", 20, 31);

      // Line separator
      doc.setLineWidth(0.5);
      doc.setDrawColor(200);
      doc.line(20, 35, 190, 35);

      // 2. Receipt Title
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.text("PAYMENT RECEIPT", 140, 50);
      
      // 3. Appointment Details Box
      doc.setDrawColor(0);
      doc.setFillColor(245, 245, 245);
      doc.rect(20, 60, 170, 90, 'F'); // Background box

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      
      // Column 1: Labels
      doc.text("Receipt ID:", 25, 75);
      doc.text("Patient Name:", 25, 85);
      doc.text("Doctor Name:", 25, 95);
      doc.text("Speciality:", 25, 105);
      doc.text("Appointment Date:", 25, 115);
      doc.text("Appointment Time:", 25, 125);
      
      // Column 2: Data
      doc.setFont("helvetica", "bold");
      doc.text(appointment._id.substring(0, 10).toUpperCase(), 80, 75);
      doc.text(appointment.userData.name || "Patient", 80, 85);
      doc.text("Dr. " + appointment.docData.name, 80, 95);
      doc.text(appointment.docData.speciality, 80, 105);
      doc.text(appointment.slotDate, 80, 115);
      doc.text(appointment.slotTime, 80, 125);

      // 4. Payment Amount Section
      doc.setDrawColor(0, 128, 0); // Green Border
      doc.setLineWidth(1);
      doc.line(20, 135, 190, 135);

      doc.setFontSize(14);
      doc.setTextColor(0, 100, 0); // Dark Green
      doc.text(`AMOUNT PAID: $${appointment.amount}`, 25, 145);
      
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text("(Inclusive of all taxes)", 150, 145);

      // 5. PAID Stamp
      doc.setDrawColor(0, 128, 0);
      doc.setLineWidth(2);
      doc.rect(130, 80, 40, 15); // Stamp Box
      doc.setFontSize(12);
      doc.setTextColor(0, 128, 0);
      doc.text("PAID", 138, 91);

      // 6. Footer
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text("This is a computer-generated receipt.", 70, 280);

      // Save File
      doc.save(`Receipt_${appointment._id}.pdf`);
    } catch (error) {
      console.error(error);
      toast.error("Could not download receipt");
    }
  };

  // --- RAZORPAY PAYMENT LOGIC ---
  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const isScriptLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load.");
        return;
      }
      
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token: token } });
      
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Health Nest",
        description: "Doctor Appointment Fee",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(backendUrl + '/api/user/verify-payment-razorpay', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId
            }, { headers: { token: token } });

            if (verifyRes.data.success) {
              toast.success("Payment Successful");
              getUserAppointments(); 
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            toast.error("Payment verification error");
          }
        },
        theme: { color: "#5f6FFF" }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className='p-4'>
      <h2 className='pb-3 font-medium text-zinc-700 border-b'>My Appointments</h2>
      
      <div className='mt-4'>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            
            {/* Doctor Image */}
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>

            {/* Appointment Info */}
            <div className='flex-1 text-sm text-zinc-600'>
               <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
               <p>{item.docData.speciality}</p>
               <p className='text-zinc-700 font-medium mt-1'>Address:</p>
               <p className='text-xs'>{item.docData.address.line1}</p>
               <p className='text-xs'>{item.docData.address.line2}</p>
               <p className='mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-2 justify-end'>
              
              {!item.cancelled && !item.payment && (
                <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
              )}
              
              {!item.cancelled && !item.payment && (
                 <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
              )}

              {/* Paid & Download Slip Buttons */}
              {item.payment && !item.cancelled && (
                <>
                    <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50 cursor-default'>Paid</button>
                    
                    <button 
                        onClick={() => downloadReceipt(item)} 
                        className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-black transition-all duration-300 flex items-center justify-center gap-2'
                    >
                        Download Slip
                    </button>
                </>
              )}

              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;