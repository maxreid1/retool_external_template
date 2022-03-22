var express = require('express')

var jwt = require('../utils/jwt')

var router = express.Router()


// protected endpoint
router.get('/protected', jwt.authenticateToken, (req, res) => {
    res.send('Access granted: ' + JSON.stringify(req.user))
})

module.exports = router;
