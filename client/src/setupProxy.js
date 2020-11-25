const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://www.xn--9p4bj5egsb.site:5000',
            changeOrigin: true,
        })
    );
};