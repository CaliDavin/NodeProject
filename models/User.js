const { Schema, model } = require('mongoose')

const Author = new Schema({
    authorId: Number,
    username: String,
    email: String,
    age: Number
})

const AuthorModel = model('Author', Author)

module.exports = AuthorModel