var express = require('express')
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var router = express.Router();

var DES3 = require('../libs/security/DES3');
var MD5 = require('../libs/security/md5-min').hex_hmac_md5

/* tools listing */

// router.all('/', function (req, res, next) {
//     console.log('Accessing the secret section ...')
//     next() // pass control to the next handler
// })

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
    console.log('REQUEST ===> %s %s %s', req.method, req.url, req.path);
    next();
});

router.get('/',function (req, res ,next) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
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
 *       - des3
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
 *       - des3
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

/**
 *http://localhost:3000/tools/md5/1234567890/0987654321
 *@swagger
 *'/tools/md5/{key}/{value}':
 *   get:
 *     tags:
 *       - md5
 *     description: Return encrypted content
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         in: path
 *         description: Encryption key
 *         required: true
 *         type: string
 *       - name: value
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
 *              - result
 */
router.get('/md5/:key/:value', upload.array(), function (req, res) {
    res.send({'result':MD5(req.params.key,req.params.value)})
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

