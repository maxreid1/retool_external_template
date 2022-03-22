var express = require('express');

var jwt = require('../utils/jwt')
var config = require('../config')

var router = express.Router();


router.get('/register', (req, res) => {
    const token = jwt.generateToken({ 
        username: config.default_user.username,
        roles: config.default_user.roles
    });
    res.json(token)
})

// router.get('/login', (req, res) => res.json({ message: 'Logged in'}))
// router.get('/logout', (req, res) => res.json({ message: 'Logged out'}))

module.exports = router;