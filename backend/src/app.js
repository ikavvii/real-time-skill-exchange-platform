const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
require('dotenv').config()

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Root route
app.get('/', (req, res) => {
  res.send('SkillSync backend is running!')
})

module.exports = app
