import React, { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../App';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa"; // open-eye
import { FaRegEyeSlash } from "react-icons/fa"; // close eye

function ForgotPassword() {

  const primaryColor = '#ff4d2d';
  const hoverColor = '#e64323';
  const bgColor = '#fff9f6';
  const borderColor = '#ddd';

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, {
        email
      }, { withCredentials: true });
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  }

  const handleVerifyOTP = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, {
        email, otp
      }, { withCredentials: true });
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  }

  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, {
        email, newPassword
      }, { withCredentials: true });
      console.log(result);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='flex items-center justify-center w-full min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full  max-w-md p-8 '>
        <div className='flex items-center gap-4 mb-4'>
          <IoArrowBackOutline size={22} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/signin")} />
          <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
        </div>

        {step == 1 &&
          <div>
            <div className='mb-6'>
              <label
                htmlFor="email"
                className='block text-gray-700 font-medium mb-1'>Email</label>
              <input
                type="email"
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                placeholder='Enter your Email'
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
            </div>
            <button
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleSendOTP}
            >
              Send Otp
            </button>
          </div>
        }

        {step == 2 &&
          <div>
            <div className='mb-6'>
              <label
                htmlFor="otp"
                className='block text-gray-700 font-medium mb-1'>OTP</label>
              <input
                type="text"
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                placeholder='Enter your OTP'
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setOtp(e.target.value)}
                value={otp} />
            </div>
            <button
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleVerifyOTP}
            >
              Verify
            </button>
          </div>
        }


        {step == 3 &&
          <div>
            <div className='mb-6'>
              <label
                htmlFor="newPassword"
                className='block text-gray-700 font-medium mb-1'>New Password</label>
              <div className='relative'>
                <input
                  type={`${showNewPassword ? "text" : "password"}`}
                  className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                  placeholder='Enter your New Password'
                  style={{ border: `1px solid ${borderColor}` }}
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword} />
                <button
                  type="button"
                  className='absolute right-3 cursor-pointer top-[14px] text-gray-500'
                  onClick={() => setShowNewPassword(prev => !prev)}
                >{!showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
              </div>
            </div>

            <div className='mb-6'>
              <label
                htmlFor="confirmPassword"
                className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
              <div className='relative'>
                <input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                  placeholder='Cofirm Password'
                  style={{ border: `1px solid ${borderColor}` }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword} />
                <button
                  type="button"
                  className='absolute right-3 cursor-pointer top-[14px] text-gray-500'
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >{!showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        }

      </div>
    </div>

  )
}

export default ForgotPassword