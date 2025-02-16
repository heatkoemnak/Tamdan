import Router from 'express';

import {
  register,
  login,
  logout,
  verifyToken,
} from '../controller/authController.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { loginLimiter } from '../middleware/loginLimiter.js';
import userModel from '../models/userModel.js';

const authRouter = Router();
authRouter.post('/register', errorHandler, register);
authRouter.post('/login', loginLimiter, errorHandler, login);
authRouter.post('/logout', errorHandler, logout);
// authRouter.get('/user', errorHandler, authenticateUser);
authRouter.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default authRouter;
