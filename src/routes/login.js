const express = require('express')
const initializePassport = require('./passport-config')
const users = require('../config/globals')
const passport = require('passport');

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
router = express.Router()

function myAuth (req, res, next) {
        passport.authenticate('local', function(err, user, info){
            if(err) { return next(err) }
            if(!user){
                return res.send({"success": false, message: 'Login failed'})
            }
            else {
                return res.send({"success": true, message: 'Login successful'})
            };
        })(req, res, next);
}

router.post('/login', myAuth)

module.exports = router