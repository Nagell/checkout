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
            />
        </div>
    </div>
</template>

<script>
import '@/assets/scss/main.scss'

import HeadMenu from '@/components/HeadMenu'
import Checkout from '@/views/Checkout'

export default {
    name: 'app',

    components: {
        HeadMenu,
        Checkout,
    },

    data() {
        return {
            tabs: [],
            activeTab: null,
            tabIndex: 0,
        }
    },

    methods: {
        addCheckoutTab(id) {
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

        setActiveTab(id) {
            this.activeTab = id
        },

        removeTab(id) {
            let indexToRemove = this.tabs.findIndex(tab => tab.id == id)
            this.tabs.splice(indexToRemove, 1)
            if (id === this.activeTab) {
                this.setNewActiveTab(indexToRemove)
            }
        },

        setNewActiveTab(removedIndex) {
            let nextTabIndex = removedIndex,
                previousTabIndex = removedIndex - 1

            if (this.tabs[nextTabIndex] !== undefined) {
                this.activeTab = this.tabs[nextTabIndex].id
            } else if (this.tabs[previousTabIndex] !== undefined) {
                this.activeTab = this.tabs[previousTabIndex].id
            }
        },
    },
}
</script>
