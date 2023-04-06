const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    let token = req.header('x-auth')
    if (token) {
        token = token.split(' ')[1]
        try {
            const tokenData = jwt.verify(token, 'dct123')
            User.findById(tokenData.id)
                .then((user) => {
                    req.user = user
                    next()
                })
        } catch (error) {
            res.json({
                error : 'page not found'
            })
        }
    }
}

module.exports = { authenticateUser }