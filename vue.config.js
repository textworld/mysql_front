const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9527 // dev port
const name = defaultSettings.title || 'vue Element Admin' // page title
module.exports = {
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in manager.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        devtool: 'source-map'
    },
    devServer: {
        port: port,
        proxy: {
            '/api/zst_mysql/v1/slowsql/': {
                target: 'http://localhost:9100',
                changeOrigin: true
            },
            '/api/zst_mysql/v1/news/': {
                target: 'http://localhost:9100',
                changeOrigin: true
            }
        },
        overlay: {
            warnings: false,
            errors: true
        },
        before: require('./mock/mock-server.js')
    }
}
