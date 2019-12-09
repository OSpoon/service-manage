##### 初始化目录:
```
npm init
```

##### 安装 Express:
```
npm install express --save
```

##### HelloWorld:
###### 创建app.js
```
//导入express
const  express = require('express')
//创建app对象
const app = express()
//构建请求
app.get('/',(req, res)=>res.send('hello world'))
//配置app监听3000端口
app.listen(3000, ()=>console.log('Example app listening on port 3000!'))
```

##### 快速创建应用的骨架-Express 应用程序生成器
###### 全局安装生成器(express-generator)
```
npm install express-generator -g
```

###### 使用生成器创建项目
```
express --view=pug service-manage
```

###### 安装依赖
```
cd service-manage
npm install
```

###### 启动应用
```
//MacOS/Linux 默认监听3000端口
DEBUG=service-manage:* npm start
//Windows 默认监听3000端口
set DEBUG=service-manage:* & npm start
```

##### 路由基本配置
###### 1. 路由文件routes->tools.js
```
var express = require('express')
//获取路由实例
var router = express.Router();

/* tools listing */
router.get('/',function (req, res ,next) {
    res.send('Welcome to visit tools... ')
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
//导出tools路由
module.exports = router
```

###### 2. app.js配置新路由文件
```
//导入toolsRouter模块
var toolsRouter = require('./routes/tools');
//添加路由规则
app.use('/tools', toolsRouter)
```

##### 路由配置
###### router.all() 对路由规则相同路由进行预处理
```
router.all('/', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})
```

###### 请求参数
###### 配置
```
router.get('/users/:userId/books/:bookId',function (req, res ,next) {
    res.send(req.params)
})
```
###### Test
```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```


### 后台开发必做之Swagger配置

#### 一、安装:
```
npm i express-swagger-generator --save-dev
```
#### 二、基本配置
```
const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
		securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
app.listen(3000);
```
#### 三、查看预览
```
http://localhost:3000/api-docs/api-docs
```
#### 四、swagger.io
```
http://editor.swagger.io/#
```

### 后台开发必做之Swagger配置2
###### 安装:
```
npm install swagger-jsdoc swagger-ui-express --save
```

###### 项目目录新增config.js
```
// swagger配置信息
exports.swaggerConfig = {
    openapi: '3.0.0',
    title: 'Node Service API',
    version: '1.0.0',
    apis: ['./routes/*.js'],
    routerPath: '/api-docs'
}
```

###### 项目目录新增\swagger\index.js\
```
var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var config = require('../config')

exports.setSwagger = function (app) {
    const options = {
        definition: {
            openapi: config.swaggerConfig.openapi,
            info: {
                title: config.swaggerConfig.title,
                version: config.swaggerConfig.version
            }
        },
        apis: config.swaggerConfig.apis
    }

    const swaggerSpec = swaggerJSDoc(options)

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
    app.use(config.swaggerConfig.routerPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
```

###### app.js配置
```
var swaggerConfig = require('./swagger')
...
var app = express();
...
swaggerConfig.setSwagger(app)
```

#### PM2使用
###### 安装:
```
npm install pm2 -g
```

###### 启动:
```
pm2 start app.js
```

###### 其他:
```
pm2 list

pm2 stop 0

pm2 restart 0

pm2 show 0

pm2 delete 0
```
