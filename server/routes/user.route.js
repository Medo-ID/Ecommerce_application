import express from 'express';
import { getUser, getUsers, updateUser } from '../controllers/user.js';
import { isAuthenticated } from '../controllers/auth.js';

export const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id', isAuthenticated, updateUser);