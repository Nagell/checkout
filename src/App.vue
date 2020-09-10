<template>
    <div id="app" class="c-layout">
        <transition name="c-dialog">
            <dialog-frame v-if="rest" title="Rest" @close-dialog="closeRestDialog">
                <template name="">
                    <input-field
                        v-model="inputRest"
                        id="rest"
                        :disabled="true"
                        :is-custom-v-model="true"
                        :prefix="rest ? rest.getCurrency().symbol : ''"
                        label="Rest"
                    />
                </template>
            </dialog-frame>
        </transition>
        <div class="c-layout__head">
            <head-menu
                :tabs="tabs"
                :active-tab="activeTab"
                @add-checkout-tab="addCheckoutTab"
                @set-active-tab="setActiveTab"
                @remove-tab="removeTab"
            />
        </div>
        <div class="c-layout__content">
            <checkout
                :key="tab.id"
                v-show="tab.id === activeTab"
                v-for="tab in tabs"
                :tab-id="tab.id"
                @set-rest="setRest"
            />
        </div>
    </div>
</template>

<script lang="ts">
import '@/assets/scss/main.scss'
import Vue from 'vue'
/* types */
import { Tab } from '@/types'
/* classes */
import money from './classes/money'
/* components */
import HeadMenu from '@/components/HeadMenu.vue'
import DialogFrame from '@/components/common/DialogFrame.vue'
import Checkout from '@/views/Checkout.vue'
import InputField from '@/components/common/InputField.vue'

export default Vue.extend({
    name: 'app',

    components: {
        HeadMenu,
        DialogFrame,
        Checkout,
        InputField,
    },

    data() {
        return {
            tabs: [] as Tab[],
            activeTab: null as number | null,
            tabIndex: 0 as number,
            rest: null as null | money,
            restDialogOpened: false,
        }
    },

    computed: {
        inputRest: {
            get(): string | null {
                return this.rest ? this.rest.getFormatted() : null
            },
        },
    },

    mounted() {
        this.addCheckoutTab()
    },

    methods: {
        addCheckoutTab(): void {
            this.tabIndex++
            this.tabs.push({
                id: this.tabIndex,
                name: 'Verkauf',
                icon: 'VK',
            })
            this.activeTab = this.tabIndex
        },

        setActiveTab(id: number): void {
            this.activeTab = id
        },

        removeTab(id: number): void {
            let indexToRemove = this.tabs.findIndex(tab => tab.id == id)
            this.tabs.splice(indexToRemove, 1)
            if (id === this.activeTab) {
                this.setNewActiveTab(indexToRemove)
            }
        },

        setNewActiveTab(removedIndex: number): void {
            let nextTabIndex = removedIndex,
                previousTabIndex = removedIndex - 1

            if (this.tabs[nextTabIndex] !== undefined) {
                this.activeTab = this.tabs[nextTabIndex].id
            } else if (this.tabs[previousTabIndex] !== undefined) {
                this.activeTab = this.tabs[previousTabIndex].id
            }
        },

        setRest(val: money) {
            this.rest = val
        },

        closeRestDialog() {
            this.rest = null

            if (this.activeTab !== null) {
                this.removeTab(this.activeTab)
            }
            if (this.tabs.length === 0) {
                this.addCheckoutTab()
            }
        },
    },
})
</script>
