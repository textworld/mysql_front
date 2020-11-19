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
        open: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8888',
        //         changeOrigin: true
        //     },
        //     // '/login': {
        //     //     target: 'http://localhost:8888',
        //     //     changeOrigin: true
        //     // },
        //     // '/logout': {
        //     //     target: 'http://localhost:8888',
        //     //     changeOrigin: true
        //     // },
        //     // '/apollo-server': {
        //     //     target: 'http://localhost:8888',
        //     //     changeOrigin: true
        //     // }
        // },
        overlay: {
            warnings: false,
            errors: true
        },
        before: require('./mock/mock-server.js')
    }
}
