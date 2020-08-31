function devLogPlugin(Vue) {
    if (devLogPlugin.installed) {
        return
    }

    const devLog = new Vue({
        methods: {
            log(...params) {
                if (JSON.parse(process.env.VUE_APP_DEVLOG)) {
                    console.log(...params)
                }
            },
            table(...params) {
                if (JSON.parse(process.env.VUE_APP_DEVLOG)) {
                    console.table(...params)
                }
            },
            error(...params) {
                if (JSON.parse(process.env.VUE_APP_DEVLOG)) {
                    console.error(...params)
                }
            },
            info(...params) {
                if (JSON.parse(process.env.VUE_APP_DEVLOG)) {
                    console.info(...params)
                }
            },
        },
    })

    Object.defineProperty(Vue.prototype, '$devLog', {
        get() {
            return devLog
        },
    })

    Vue.mixin({})
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(devLogPlugin)
}

export default devLogPlugin
