import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa"; // open-eye
import { FaRegEyeSlash } from "react-icons/fa"; // close eye
import { FcGoogle } from "react-icons/fc"; // Google
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase.js';
import { ClipLoader } from "react-spinners"

function SignUp() {

    const primaryColor = '#ff4d2d';
    const hoverColor = '#e64323';
    const bgColor = '#fff9f6';
    const borderColor = '#ddd';

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName,
                email,
                password,
                mobileNumber: mobile,
                role
            }, { withCredentials: true })
            setErr("");
            setLoading(false);
            navigate("/signin");
            console.log(result);
        } catch (error) {
            setLoading(false);
            console.log(error.response.data);
            setErr(error?.response?.data?.message)
        }
    }

    const handleGoogleAuth = async () => {
        try {
            if (!mobile || mobile.trim() === "") {
                return setErr("Mobile Number is Required");
            }

            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const user = result.user;

            const responce = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: user.displayName,
                email: user.email,
                mobileNumber: mobile.trim(),
                role
            }, { withCredentials: true });
            console.log(responce);
            navigate("/");

        } catch (error) {
            console.log(error);
            setErr(error?.response?.data?.message)
        }

    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            {/* <div className={
                `bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{
                    border: `1px solid ${borderColor}`
                }}> */}
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignUp();
                }}
                className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
                style={{ border: `1px solid ${borderColor}` }}
            >
                <h1
                    className={`text-3xl font-bold mb-2 text-[${primaryColor}]`}
                    style={{ color: primaryColor }}>Zestio</h1>
                <p
                    className='text-gray-600 mb-2'>Create your account for delicious food delivery</p>

                {/* fullname */}

                <div className='mb-4'>
                    <label
                        htmlFor="fullName"
                        className='block text-gray-700 font-medium mb-1'>Full Name</label>
                    <input
                        type="text"
                        className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your Full Name'
                        style={{ border: `1px solid ${borderColor}` }}
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        required />
                </div>

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
                        value={email}
                        required />
                </div>

                {/* MobileNumber */}

                <div className='mb-4'>
                    <label
                        htmlFor="mobile"
                        className='block text-gray-700 font-medium mb-1'>Mobile</label>
                    <input
                        type="text"
                        className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your Mobile Number'
                        style={{ border: `1px solid ${borderColor}` }}
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                        required />
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
                            value={password}
                            required />
                        <button
                            type="button"
                            className='absolute right-3 cursor-pointer top-[14px] text-gray-500'
                            onClick={() => setShowPassword(prev => !prev)}
                        >{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>
                </div>

                {/* Role */}

                <div className='mb-4'>
                    <label
                        htmlFor="role"
                        className='block text-gray-700 font-medium mb-1'>Role</label>
                    <div
                        className='flex gap-2'>
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button
                                key={r}
                                className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer'
                                onClick={() => setRole(r)}
                                style={
                                    role == r ? {
                                        backgroundColor: primaryColor,
                                        color: 'white'
                                    } : {
                                        border: `1px solid ${primaryColor}`,
                                        color: primaryColor
                                    }
                                }>{r}</button>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
                    disabled={loading}
                >
                    {loading ? <ClipLoader size={20} color="white" /> : "Sign up"}
                </button>
                {err && (
                    <p className='text-red-500 text-center'>
                        *{err}
                    </p>
                )}

                <button
                    type='button'
                    className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-300 hover:bg-gray-100 cursor-pointer'
                    onClick={handleGoogleAuth}
                >
                    <FcGoogle size={20} />
                    <span>Sign Up with Google</span>
                </button>
                <p
                    className='text-center mt-2' > Already have an Account ?
                    <span
                        className='text-[#ff4d2d] cursor-pointer'
                        onClick={() => navigate("/signin")}>Sign In
                    </span>
                </p>
            </form>
        </div >
    )
}

export default SignUp;