const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    authorID: {type: mongoose.Schema.Types.ObjectId, required: true},
    comment: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model("Comment", commentSchema)