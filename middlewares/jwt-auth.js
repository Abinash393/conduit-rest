const jwt = require("jsonwebtoken")

module.exports.verifyToken = async function(req, res, next) {
    try {
        
        next()
    } catch(err) {
        next(err)
    }
}