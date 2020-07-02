const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 8, maxlength: 32},
    content: {type: String, required: true, minlength: 32, maxlength: 4096},
    image: {type: String, default: ""},
    tags: [{type: String, maxlength: 16}],
    authorID: {type: mongoose.Schema.Types.ObjectId}
}, {timestamps: true})

module.exports = mongoose.model("Article", articleSchema)
