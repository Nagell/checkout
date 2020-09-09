// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const config = {
    // ...
    configureWebpack: {
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
            },
        },
    },
}

module.exports = config
