const jwt = require("jsonwebtoken")

const User = require("../models/user")

module.exports = {
    signup: async function(req, res, next) {
        try {
            if (!req.body.name || !req.body.password || !req.body.email) {
                res.status(400).json({success: false, msg: "all field required"})
            }
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
            res.status(200).json({success: true, msg: "user successfully registered"})
        } catch(err) {
            next(err)
        }
    },

    login: async function(req, res, next) {
        try {
            if (!req.body.email || !req.body.password) {
                res.status(400).json({success: false, msg: "all field required"})
            }
            const existUser = await User.findOne({email: req.body.email})
            if (!existUser) {
                res.status(400).json({success: false, msg: "invalid e-mail address"})
            }

            const passwordMatch = await existUser.verifyPassword(req.body.password, next)

            if (!passwordMatch) {
                res.status(400).json({success: false, msg: "wrong password"})
            }

            const token = jwt.sign({ID: existUser._id}, process.env.JWT_SECRET)

            res.setHeader("set-cookie", [`token=${token}`])
            res.status(200).json({success: true})
        } catch (err) {
            next(err)
        }
    }
}