import Vue from 'vue'
// import { devLogClass } from '@/plugins/devLog'

export interface devLog {
    log(...params: unknown[]): void
    table(...params: unknown[]): void
    error(...params: unknown[]): void
    info(...params: unknown[]): void
}

declare module 'vue/types/vue' {
    interface Vue {
        $devLog: devLog
    }
}
