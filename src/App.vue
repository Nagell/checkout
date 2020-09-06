<template>
    <div id="app" class="c-layout">
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
                :to-pay="tab.toPay"
                :tab-id="tab.id"
            />
        </div>
    </div>
</template>

<script lang="ts">
import '@/assets/scss/main.scss'

import Vue from 'vue'
import { Tab } from '@/types'

import HeadMenu from '@/components/HeadMenu.vue'
import Checkout from '@/views/Checkout.vue'

export default Vue.extend({
    name: 'app',

    components: {
        HeadMenu,
        Checkout,
    },

    data() {
        return {
            tabs: [] as Tab[],
            activeTab: null as number | null,
            tabIndex: 0 as number,
        }
    },

    methods: {
        addCheckoutTab(): void {
            this.tabIndex++
            let amount = Math.random() * 200,
                roundedAmount = Math.round(amount * 100) / 100
            this.tabs.push({
                id: this.tabIndex,
                name: 'Verkauf',
                icon: 'VK',
                toPay: roundedAmount,
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
    },
})
</script>
