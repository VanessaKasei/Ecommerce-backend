require('dotenv').config();

const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password during registration:', hashedPassword);

    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    console.log('User saved to database:', newUser);

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Attempting to login with email: ${email}`);
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`Login failed: No user found with email ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(`Found user: ${user.email}`);
    console.log('user.password', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Plain password: ${password}`);
    console.log(`Stored hashed password: ${user.password}`);
    console.log(`Password match result: ${isMatch}`);
    if (!isMatch) {
      console.error(`Login failed: Incorrect password for email ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Password matches, generating token...");
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET is not defined.' });
    }
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`Login successful for user: ${email}`);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.stack);
    res.status(500).json({ message: "Server error", error: error.stack });
  }
};


module.exports = { registerUser, loginUser };
