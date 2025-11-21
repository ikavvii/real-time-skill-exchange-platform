const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  description: String,
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
})

module.exports = mongoose.model('Request', requestSchema)
