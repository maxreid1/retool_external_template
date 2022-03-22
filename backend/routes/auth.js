var express = require('express');

var jwt = require('../utils/jwt')
var config = require('../config')

var router = express.Router();


router.get('/register', (req, res) => {
    const token = jwt.generateToken(config.default_user)
    res.json(token)
})

module.exports = router;