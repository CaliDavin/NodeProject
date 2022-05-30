const { Schema, model } = require('mongoose')



const Article = new Schema({
    title: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
    }
})

const ArticleModel = model('Article', Article)


module.exports = {
    ArticleModel
}
