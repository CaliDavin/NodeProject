var express = require('express');
const authorController = require('../controllers/authorController');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.route('/').get(authorController.getArticles)

/* GET Users page. */

router.route('/user').post(userController.createUser)
router.route('/users').get(userController.getUsers)
router.route('/user/:id').get(userController.getUser)
router.route('/article').post(authorController.createArticle)
router.route('/article/:id').get(authorController.getArticle)
router.route('/article/:author').get(authorController.findArticlesByUserId)




module.exports = router;
