import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/mongodb.js';
import {
  register,
  login,
  logout,
  authenticateUser,
} from './controller/authController.js';

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
await connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'https://tamdan.vercel.app', credentials: true }));

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/user', authenticateUser, (req, res) =>
  res.status(200).json({
    message: 'User logged out successfully',
    success: true,
    user: req.user,
  })
);
app.use('/api/logout', logout);

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.listen( port || 5000, () => {
  console.log(`Server is running on port ${port}`);
});
