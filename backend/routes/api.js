var jwt = require('../utils/jwt')

var express = require('express');
var router = express.Router();

var config = require('../config') 

// test endpoint  
router.get('/test', (req, res) => res.send(config.api.testResponse))

// protected endpoint
router.get('/protected', jwt.authenticateToken, (req, res) => {
    res.send('Access granted: ' + JSON.stringify(req.user))
})

module.exports = router;
