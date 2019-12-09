var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerConfig = require('../config').swaggerConfig

exports.setSwagger = function (app) {
    const options = {
        definition: {
            openapi: swaggerConfig.openapi,
            info: {
                title: swaggerConfig.title,
                version: swaggerConfig.version
            }
        },
        apis: swaggerConfig.apis
    }

    const swaggerSpec = swaggerJSDoc(options)

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
    app.use(swaggerConfig.routerPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
