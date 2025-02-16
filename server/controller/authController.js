import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isProduction = process.env.NODE_ENV === 'production';
const setCookie = async (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// Register a new user
export const register = async (req, res, next) => {
  const { name, email, password, agree } = req.body;

  try {
    if (!name || !email || !password || !agree) {
      throw new Error('All fields are required');
    }
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashPassword = await bcrypt.hash(password, 10);
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
    if (!token) throw new Error('Token not generated');

    await setCookie(res, token);
    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    next(error);
  }
};

// Login an existing user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error('Email and password are required'); // Throw an error
    }

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error(`Failed login attempt for email: ${email}`);
    }
    if (user.status === 'blocked') {
      throw new Error('User account is blocked');
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set the token in a cookie
    if (!token) throw new Error('Token not generated');
    await setCookie(res, token);

    // Send response
    res.status(200).json({
      message: 'User logged in successfully',
      success: true,
      token,
    });
  } catch (error) {
    next(error); // Pass the error to the centralized error handler
  }
};

// Logout the user
export const logout = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error('User not logged in');
    }
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure,
    });
    res
      .status(200)
      .json({ message: 'User logged out successfully', success: true });
  } catch (error) {
    next(error);
  }
};

// Middleware to authenticate user via cookie

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ Get token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach user to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
