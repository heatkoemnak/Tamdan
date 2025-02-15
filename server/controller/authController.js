import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const register = async (req, res) => {
  const { name, email, password, agree } = req.body;
  if (!name || !email || !password || !agree) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      agree,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site cookie support
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      console.warn(`Failed login attempt for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user account is blocked
    if (user.status === 'blocked') {
      return res.status(403).json({ message: 'Your account has been blocked' });
    }
    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.warn(`Failed login attempt for email: ${email}`);
      return res.status(401).json({
        message: 'Invalid credentials',
        resetPasswordLink: '/reset-password',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie securely
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site cookie support
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response
    res.status(200).json({
      message: 'User logged in successfully',
      success: true,
      token,
      expiresIn: Date.now() + 7 * 24 * 60 * 60 * 1000, // Token expiry time
    });
  } catch (error) {
    console.error('Login Error:', error);
    next(error); // Pass the error to the centralized error handler
  }
};

export const logout = async (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({ message: 'User not logged in' });
  }
  try {
    res.clearCookie('token', {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site cookie support
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res
      .status(200)
      .json({ message: 'User logged out successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// **🔹 Middleware to Authenticate User via Cookie**
export const authenticateUser = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(403).json({ message: 'Not authenticated' });
  console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};
