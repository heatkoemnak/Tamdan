import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper function to set cookies
const setCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true, // Prevent client-side access
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Register a new user
export const register = async (req, res, next) => {
  const { name, email, password, agree } = req.body;

  // Validate input
  if (!name || !email || !password || !agree) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      agree,
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set the token in a cookie
    setCookie(res, token);

    // Send response
    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login an existing user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
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
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set the token in a cookie
    setCookie(res, token);

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

// Logout the user
export const logout = async (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({ message: 'User not logged in' });
  }

  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res
      .status(200)
      .json({ message: 'User logged out successfully', success: true });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Middleware to authenticate user via cookie
export const authenticateUser = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ message: 'Not authenticated' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
