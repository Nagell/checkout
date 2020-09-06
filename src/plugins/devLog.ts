import _Vue from 'vue'

function devLogPlugin(Vue: typeof _Vue): void {
    const devLog = new Vue({
        methods: {
            log(...params: unknown[]) {
                if (JSON.parse(process.env.VUE_APP_DEVLOG)) {
                    console.log(...params)
                }
            },
            table(...params: unknown[]) {
                if (JSON.parse(process.env.VUE_APP_DEVLOG)) {
                    console.table(...params)
                }
            },
            error(...params: unknown[]) {
                if (JSON.parse(process.env.VUE_APP_DEVLOG)) {
                    console.error(...params)
                }
            },
            info(...params: unknown[]) {
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
