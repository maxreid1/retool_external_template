var jwt = require('jsonwebtoken')
var config = require('../config')

module.exports.generateToken = (payload) => {
    return jwt.sign(
        payload, 
        process.env.TOKEN_SECRET, 
        { 
            algorithm: 'HS256',
            expiresIn: config.auth.tokenDuration 
        });
}

module.exports.validateRawToken = (token) => {
    return jwt.verify(
        token, 
        process.env.TOKEN_SECRET, 
        { algorithms: ['HS256'] }
    )
}

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    var token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        if (config.auth.fallbackToDefault) {
            token = this.generateToken(config.default_user)
        } else {
            return res.sendStatus(401)
        }
    }

    jwt.verify(
        token, 
        process.env.TOKEN_SECRET, 
        { algorithms: ['HS256'] }, 
        (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
}