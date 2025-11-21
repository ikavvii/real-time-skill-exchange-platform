const express = require('express')
const requestController = require('../controllers/requestController')
const auth = require('../middleware/auth');

const router = express.Router()

router.post('/', auth, requestController.createRequest)
router.get('/', auth, requestController.getAllRequests)

module.exports = router
