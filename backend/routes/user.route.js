import express from 'express';
import { loginUser,registerUser } from '../controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/login',loginUser);
userRouter.post('/register',registerUser);

export { userRouter };