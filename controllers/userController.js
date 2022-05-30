const AuthorModel = require('../models/User')
const { ArticleModel } = require('../models/Article')
const fetch = require('node-fetch')

module.exports = {
    getUser: (req, res) => {
        AuthorModel.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                ArticleModel.find({author: req.params.id}, (err, articles) => {
                    if (articles) {
                        res.render('user', {user, articles})
                    }
                })
                if (!user) {
                    res.status(404).json({"message": "User not found"})
                }
                
                
            }
        })
    },
    createUser: (req, res) => {
        const { username, email, age } = req.body
        const User = new AuthorModel({ username, email, age })

        User.save( (err, User) => {
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
    getUsers: (req, res) => {
        AuthorModel.find({}, (err, users) => {
            var u = {}
            users.forEach(user => {
                u[user._id] = user
            });
            res.render('users', {
                u
            })
        })
    },
}