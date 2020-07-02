const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 16 },
    email:{
        type: String,
        strim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
    },
    password: {type: String, required: true },
    avatar: {type: String, default: ""},
    createdArticles: [{type: mongoose.Schema.Types.ObjectId}],
    likedArticles: [{type: mongoose.Schema.Types.ObjectId}]
}, {timestamps: true})


// pre save hook for hashing password
userSchema.pre("save", async function(next) {
    try {
        if (this.password && this.isDirectModified("password")) {
            const encryptedPassword = await bcrypt.hash(this.password, 11)
            this.password = encryptedPassword
        }
        next()
    } catch(err) {
        next(err)
    }
})

userSchema.methods.verifyPassword = async function(password, next) {
    try {
        const isVerified = await bcrypt.compare(password, this.password)
        return isVerified
    } catch(err) {
        next(err)
    }
}

module.exports = mongoose.model("User", userSchema)