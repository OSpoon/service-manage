var express = require('express')
var router = express.Router();

var DES3 = require('../libs/security/DES3');

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
/**
 *http://localhost:3000/tools/des3/encrypt/1234567890
 *@swagger
 *'/tools/des3/encrypt/{plaintext}':
 *   get:
 *     tags:
 *       - plaintext
 *     description: Return encrypted content
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: plaintext
 *         in: path
 *         description: Clear text before encryption
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: successful operation
 *         schema:
 *           type: object
 *           required:
 *              - ciphertext
*/
router.get('/des3/encrypt/:plaintext',function (req, res) {
    res.send({'ciphertext':DES3.encrypt('', req.params.plaintext)})
})

/**
 *http://localhost:3000/tools/des3/decrypt/zWI1jkgPpYUys5c06MYEQQ==
 *@swagger
 *'/tools/des3/decrypt/{ciphertext}':
 *   get:
 *     tags:
 *       - ciphertext
 *     description: Return encrypted content
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ciphertext
 *         in: path
 *         description: Clear text before encryption
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: successful operation
 *         schema:
 *           type: object
 *           required:
 *              - plaintext
 */
router.get('/des3/decrypt/:ciphertext',function (req, res) {
    res.send(DES3.decrypt('', req.params.ciphertext))
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

