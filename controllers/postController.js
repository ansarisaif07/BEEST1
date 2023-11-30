const Post = require('../models/postModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const postController = {
  // Existing code...

  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create a new user with a hashed password
      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user in the database
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = postController;
