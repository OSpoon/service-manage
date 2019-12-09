// swagger配置信息
exports.swaggerConfig = {
    openapi: '3.0.0',
    title: 'Node Service API',
    version: '1.0.0',
    apis: ['./routes/*.js'],
    routerPath: '/api-docs'
}
