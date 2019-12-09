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
