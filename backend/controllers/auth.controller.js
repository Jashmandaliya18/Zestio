import getToken from "../config/token.js";
import User from "../models/user.model.js"
import { sendOTPMail } from "../config/mail.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, mobileNumber, role } = req.body;

        if (!fullName || !email || !password || !mobileNumber || !role) {
            return res.status(400).json({ message: "Fill All Details." });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exist with this Email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 Characters" });
        }
        if (mobileNumber.length < 10) {
            return res.status(400).json({ message: "Mobile must be at least 10 digits" });
        }
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            mobileNumber,
            role,
        });

        const token = await getToken(newUser._id);

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return res.status(201).json({
            message: "User Created Successfully",
            newUser: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            }
        })

    } catch (error) {
        return res.status(500).json({ message: `Sign Up Error: ${error}` });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are Required " });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not Exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = await getToken(user._id);

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return res.status(200).json({
            message: "Login Successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Sign In Error: ${error}` });
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "SignOut Successful" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Sign Out Error: ${error}` });
    }
}

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not Exist" });
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.otpExpires = Date.now() + 2 * 60 * 1000;
        user.isOtpVerify = false;
        await user.save();

        await sendOTPMail(user.email, otp);

        return res.status(200).json({ message: "OTP sent to your email" });

    } catch (error) {
        return res.status(500).json(`Send OTP error ${error}`);
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (user.resetOtp != otp) {
            return res.status(400).json({ message: "OTP Invalid" });
        }
        if (user.otpExpires < Data.now()) {
            return res.status(400).json({ message: "OTP Expired" });
        }
        user.isOtpVerify = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "OTP Verifu Successfully" });

    } catch (error) {
        return res.status(500).json(`Verify OTP error ${error}`);
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not Exist" });
        }
        if (!user.isOtpVerify) {
            return res.status(400).json({ message: "OTP Verification Required" });
        }
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;

        user.isOtpVerify = false;

        await user.save();
    } catch (error) {
        return res.status(500).json(`Reset Password error ${error}`);
    }
}
