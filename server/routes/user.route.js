import express from 'express';
import { getAddressforCurrentUser, getCurrentUser, updateAddress, updateUser } from '../controllers/user.js';
import { validateAddressUser, validateUpdateUser } from '../utils/validateInput.js';

export const userRouter = express.Router();

userRouter.get('/user', getCurrentUser);
userRouter.get('/address', getAddressforCurrentUser);
userRouter.put('/update/:id', validateUpdateUser, updateUser);
userRouter.put('/address/:id', validateAddressUser, updateAddress);