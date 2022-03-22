var express = require('express');
var router = express.Router();

var jwt = require('../utils/jwt')
var config = require('../config')


router.get('/register', (req, res) => {
    const token = jwt.generateToken({ 
        username: config.default_user.username, // req.body.username,
        roles: config.default_user.roles // req.body.roles,
    });
    res.json(token)
})

router.get('/login', (req, res) => res.json({ message: 'Logged in'}))
router.get('/logout', (req, res) => res.json({ message: 'Logged out'}))

router.get('/validate', jwt.authenticateToken, (req, res) => {
    res.send('Access granted: ' + JSON.stringify(req.user))
})

module.exports = router;