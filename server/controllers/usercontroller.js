import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Register a new user and return _id so the frontend can use it
const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
  
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email is already registered' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Removed creditBalance
      const newUser = new userModel({ name, email, password: hashedPassword });
  
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      res.status(201).json({
        success: true,
        token,
        user: { _id: newUser._id, name: newUser.name, email: newUser.email }
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  
  
  // Log in an existing user and return _id along with other user details
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'User does not exist' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid Credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.status(200).json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  // Get Dashboard
const getDashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // comes from userAuth middleware
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user profile", error });
  }
};


  export { registerUser, loginUser,getDashboard,getUserProfile}