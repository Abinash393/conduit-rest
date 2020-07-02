const router = require("express").Router()
const userCon = require("../controllers/user")

// register user
router.post("/signup", userCon.signup)

// login user
router.post("/login", userCon.login)

module.exports = router