const router = require('express').Router()
const HomeController = require("../controllers/HomeController")
const PostController = require('../controllers/PostController')
const UserController = require('../controllers/UserController')
const TagController = require('../controllers/TagController')
const { checkLogin, pageLogin } = require('../middleware/login')

router.get('/', UserController.userLogin)
router.get('/users/register', UserController.add)
router.post('/users/register', UserController.fixAdd)
router.get('/users/list', UserController.show)
router.get('/users/login', pageLogin, UserController.userLogin)
router.post('/users/login', UserController.postUserLogin)
router.get('/users/logout', UserController.logout)


router.get("/posts", checkLogin, PostController.posts)
router.get("/posts/add", PostController.postsAdd)
router.post("/posts/add", PostController.postPostsAdd)
router.get("/posts/edit/:id", PostController.postsEdit)
router.post("/posts/edit/:id", PostController.postPostsEdit)
router.get("/posts/delete/:id", PostController.postsDelete)


router.get("/tags", TagController.tags) //menampilkan tags done


module.exports = router