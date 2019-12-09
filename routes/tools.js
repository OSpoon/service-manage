var express = require('express')
var router = express.Router();

/* tools listing */

router.all('/', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

/**
 * @swagger
 * /hello:
 *   get:
 *     tags:
 *       - 测试
 *     summary: GET 测试
 *     description: 用于测试基础 GET 请求的接口
 *     responses:
 *       200:
 *         description: 【成功】 返回 world
 */
router.get('/',function (req, res ,next) {
    res.render('index');
})

router.get('/users/:userId/books/:bookId',function (req, res ,next) {
    res.send(req.params)
})

router.post('/', function (req, res) {
    res.send('Got a POST request')
})

router.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})

router.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})

module.exports = router

