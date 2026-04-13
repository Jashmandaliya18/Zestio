import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa"; // open-eye
import { FaRegEyeSlash } from "react-icons/fa"; // close eye
import { FcGoogle } from "react-icons/fc"; // Google
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';

function SignIn() {

    const primaryColor = '#ff4d2d';
    const hoverColor = '#e64323';
    const bgColor = '#fff9f6';
    const borderColor = '#ddd';

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            if (!email || !password) {
                return alert("Fill all details");
            }

            const result = await axios.post(
                `${serverUrl}/api/auth/signin`,
                { email, password },
                { withCredentials: true }
            );

            console.log(result);

            if (result.status === 200) {
                navigate("/");
            }

        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignIn();
                }}
                className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]"
                style={{ border: `1px solid ${borderColor}` }}
            >
                <h1
                    className={`text-3xl font-bold mb-2 text-[${primaryColor}]`}
                    style={{ color: primaryColor }}>Zestio</h1>
                <p
                    className='text-gray-600 mb-2'>Sign in to your account for delicious food delivery</p>

                {/* Email */}

                <div className='mb-4'>
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

                {/* Password */}

                <div className='mb-4'>
                    <label
                        htmlFor="password"
                        className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                            placeholder='Enter your password'
                            style={{ border: `1px solid ${borderColor}` }}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                        <button
                            type="button"
                            className='absolute right-3 cursor-pointer top-[14px] text-gray-500'
                            onClick={() => setShowPassword(prev => !prev)}
                        >{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>
                </div>

                {/* Forgot Password */}

                <div
                    className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer'
                    onClick={() => navigate("/forgot-password")}>
                    Forgot Password
                </div>
                <button
                    type="submit"
                    className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
                >
                    Sign In
                </button>

                <button
                    className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-300 hover:bg-gray-100 cursor-pointer'>
                    <FcGoogle size={20} />
                    <span>Sign In with Google</span>
                </button>
                <p
                    className='text-center mt-2' > Want to Create Account ?
                    <span
                        className='text-[#ff4d2d] cursor-pointer'
                        onClick={() => navigate("/signup")}>Sign Up
                    </span>
                </p>
            </form>
        </div >
    )
}

export default SignIn