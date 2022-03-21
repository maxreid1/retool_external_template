var express = require('express');
var router = express.Router();

var jwt = require('../utils/jwt')

var config = require('../config')


router.post('/register', (req, res) => {
    const token = jwt.generateToken({ 
        username: req.body.username,
        roles: req.body.roles,
    });
    res.json(token)
})

router.post('/login', (req, res) => {
    const token = jwt.generateToken({ 
        username: req.body.username,
        roles: req.body.roles,
    });
    res.json(token)
})

router.post('/getDefaultToken', (req, res) => {
    const token = jwt.generateToken({
        username: config.default_user.username,
        roles: config.default_user.roles
    })
    res.json(token)
})

router.get('/logout', (req, res) => {
    res.json({ message: 'Logged out'})
})

module.exports = router;