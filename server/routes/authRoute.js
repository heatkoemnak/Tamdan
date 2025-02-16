import Router from 'express';

import {
  register,
  login,
  logout,
  authenticateUser,
} from '../controller/authController.js';
import { loginLimiter } from '../middleware/loginLimiter.js';
import userModel from '../models/userModel.js';

const authRouter = Router();
authRouter.post('/register', register);
// authRouter.post('/login', loginLimiter, login);
authRouter.post('/logout', logout);
// authRouter.get('/user', errorHandler, authenticateUser);
authRouter.get('/user', authenticateUser, async (req, res) => {
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
