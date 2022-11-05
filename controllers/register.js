const bcrypt = require('bcrypt')
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const registerUser = async (req, res) => {
    console.log('post on /registration touched')
    try{
        const hashedPass = await bcrypt.hash(req.body.password, 10)

        // add to db

        // users.push({
        //     id: Date.now().toString(),
        //     email: req.body.email,
        //     password: hashedPass
        // })
        res.send({"success": true, msg: "Registration Succeeded"})
    } catch{
        throw new CustomAPIError('registration failed', StatusCodes.BAD_REQUEST)
    }
}

module.exports = {
    registerUser
}