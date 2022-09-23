const express = require('express')
const bcrypt = require('bcrypt');
const users = require('../config/globals')
router = express.Router()

async function addUser(req, res) {
    console.log('post on /registration touched')
    try{
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            email: req.body.email,
            password: hashedPass
        })
        res.send({"success": true, msg: "Registration Succeeded"})
    } catch{
        res.send({"failed": false, msg: "Registration Failed"})
    }
    console.log(users)
}

router.post('/registration', addUser)

module.exports = router