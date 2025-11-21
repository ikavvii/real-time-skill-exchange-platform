const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, bio, skillsToTeach } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already exists' })
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashed, bio, skillsToTeach })
    await user.save()
    res.status(201).json({ message: 'Registered', userId: user._id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Email not found' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Incorrect password' })
    const token = jwt.sign(
      { id: user._id, name: user.name }, // payload (minimally user id)
      process.env.JWT_SECRET, // secret key
      { expiresIn: '3h' } // token validity
    )
    res.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name },
      token
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get all users (omit password)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
