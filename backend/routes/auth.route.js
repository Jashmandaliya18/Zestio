import express, { Router } from 'express';
import {
    resetPassword,
    sendOTP,
    signIn,
    signOut,
    signup,
    verifyOTP
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);
authRouter.post("/send-otp", sendOTP);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-passoword", resetPassword);


export default authRouter;