import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/mongodb.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/authRoute.js';
import { loginLimiter } from './middleware/loginLimiter.js';
import { login } from './controller/authController.js';

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use('/api/auth', authRouter);
app.post('/api/auth/login', loginLimiter, login);
app.get('/', async (req, res) => {
  try {
    res.status(200).json({ message: 'Server is running' });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDB();
});
