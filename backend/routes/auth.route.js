import express, { Router } from 'express';
import { signIn, signOut, signup } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);

export default authRouter;