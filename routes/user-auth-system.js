const express = require('express')
const router = express.Router()

const { registerUser } = require('../controllers/register')

router.route('/register').post(registerUser)

module.exports = router