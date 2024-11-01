import express from 'express';
import { getUser, getUsers, updateUser } from '../controllers/user.js';
import { isAuthenticated } from '../controllers/auth.js';

export const userRouter = express.Router();

userRouter.get('/', isAuthenticated, getUser);
userRouter.put('/:id', isAuthenticated, updateUser);