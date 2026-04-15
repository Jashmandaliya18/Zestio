import { Router } from 'express';
import { getCurrentUser } from '../controllers/user.controller.js'
import {isAuth} from '../middlewares/isAuth.js'

const userRouter = Router();

userRouter.get("/current", isAuth, getCurrentUser);


export default userRouter;