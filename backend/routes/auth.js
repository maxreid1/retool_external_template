var express = require('express');
var router = express.Router();

var jwt = require('../utils/jwt')


router.post('/createNewUser', (req, res) => {
    const token = jwt.generateToken({ 
        username: req.body.username,
        roles: req.body.roles,
    });
    res.json(token);
});  

module.exports = router;