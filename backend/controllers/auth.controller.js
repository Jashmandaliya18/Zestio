import getToken from "../config/token.js";
import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, mobileNumber, role } = req.body;

        if (!fullName || !email || !password || !mobileNumber || !role) {
            return res.status(400).json({ message: "Provide All Details." });
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

        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            mobileNumber,
            role,
        });

        const token = await getToken(user._id);

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return res.status(201).json({
            message: "User Created Successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        })

    } catch (error) {
        return res.status(500).json({ message: `Sign Up Error: ${error}` });
    }
}