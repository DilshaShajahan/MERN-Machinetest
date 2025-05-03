const User = require('../models/User');
const generateOTP = require('../utils/generateOTP');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Signup
exports.signup = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    const otp = generateOTP();

    if (user) {
      user.otp = otp;
    } else {
      user = new User({ email, otp });
    }

    await user.save();
    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.isVerified = true;
    user.otp = null;
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(400).json({ message: "User not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
