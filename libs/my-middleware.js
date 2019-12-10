module.exports = function(options) {
    return function(req, res, next) {
        console.log('Implement the middleware function based on the options object')
        console.log('app',req.app)
        console.log('baseUrl : ',req.baseUrl)
        console.log('body',req.body)
        console.log('cookies',req.cookies)
        console.log('fresh',req.fresh)
        console.log('hostname',req.hostname)
        console.log('ip',req.ip)
        console.log('ips',req.ips)
        console.log('method',req.method)
        console.log('originalUrl',req.originalUrl)
        console.log('params',req.params)
        console.log('path',req.path)
        console.log('protocol',req.protocol)
        console.log('query',req.query)
        console.log('route',req.route)
        console.log('secure',req.secure)
        console.log('stale',req.stale)
        console.log('signedCookies',req.signedCookies)
        console.log('subdomains',req.subdomains)
        console.log('xhr',req.xhr)
        // Implement the middleware function based on the options object
        console.log('------------------------------------------------------')
        next()
    }
}
