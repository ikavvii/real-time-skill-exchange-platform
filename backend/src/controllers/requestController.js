const Request = require('../models/Request')

// Create a new help request
exports.createRequest = async (req, res) => {
  try {
    const { skill, description, requester } = req.body

    
    const newRequest = new Request({ skill, description, requester })
    await newRequest.save()
    res
      .status(201)
      .json({ message: 'Request posted', requestId: newRequest._id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get all active help requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({ active: true }).populate(
      'requester',
      'name skillsToTeach'
    )
    res.json(requests)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
