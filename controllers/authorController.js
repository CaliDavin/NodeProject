const { ArticleModel } = require('../models/Article')
const AuthorModel = require('../models/User')
const fetch = require('node-fetch')

module.exports = {
    // createAuthor: (req, res) => {
    //     const { name } = req.body
    //     const author = new AuthorModel({ name })

    //     author.save( (err, author) => {
    //         if (err) {
    //             res.status(500).json({
    //                 message: err
    //             })
    //         }
    //         else {
    //             res.status(201).json({
    //                 status: 201,
    //                 message: "succes",
    //                 author
    //             })
    //         }
    //     })
    // },
    createArticle: (req, res) => {
        const { title, description, author } = req.body
        const Article = new ArticleModel({ title, description, author })

        Article.save( (err, Article) => {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.redirect('back')
            }
        })
    },
    findArticlesByUserId: (req, res) => {
        const userId = req.params.author
        console.log(userId)
        ArticleModel.find({ author: userId }, (err, articles) => {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    articles
                })
            }
        })
    },
    getArticles: (req, res) => {
        ArticleModel.find({}, (err, articles) => {
            var a = {}
            articles.forEach(article => {
                a[article._id] = article
            });
            res.render('index', {
                a
            })
        })
    },
    getArticle: (req, res) => {
        ArticleModel.findById(req.params.id, (err, article) => {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                AuthorModel.find((err, user) => {
                    if (user) {
                        res.render('article', {article, user})
                    }
                })
                if (!article) {
                    res.status(404).json({"message": "article not found"})
                }
                // res.render('article', {article})
                
            }
        })
    }
}