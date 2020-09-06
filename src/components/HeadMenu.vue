<template>
    <menu class="c-head-menu">
        <div class="c-head-menu-sub">
            <button class="c-head-menu-sub__item">
                <i class="fas fa-lock u-fsize-l" />
            </button>
            <button class="c-head-menu-sub__item">
                <i class="fas fa-bars u-fsize-l" />
            </button>
            <button class="c-head-menu-sub__item">
                <i class="fas fa-file-export u-fsize-l" />
            </button>
        </div>
        <div class="c-head-menu__tabs-container">
            <ul>
                <li
                    :key="tab.id"
                    v-for="tab in tabs"
                    :class="activeTab === tab.id ? 'active' : ''"
                    @click="setActiveTab(tab.id)"
                >
                    <span class="c-head-menu__tab-icon">
                        <p>{{ tab.icon }}</p>
                    </span>
                    <span>
                        <p>{{ tab.name }}</p>
                        <p>{{ tab.id }}</p>
                    </span>
                    <span class="c-head-menu__tab-close" @click.stop="removeTab(tab.id)">
                        <i class="fas fa-times" />
                    </span>
                </li>
            </ul>

            <button class="c-head-menu-sub__item" @click="addCheckoutTab">
                <i class="fas fa-plus u-fsize-l" />
            </button>
        </div>
    </menu>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { Tab } from '@/types'

export default Vue.extend({
    name: 'head-menu',

    props: {
        tabs: {
            type: Array as PropType<Tab[]>,
            required: true,
        },
        activeTab: {
            type: Number as PropType<number>,
            default: 0,
        },
    },

    methods: {
        addCheckoutTab(): void {
            this.$emit('add-checkout-tab')
        },

        setActiveTab(id: number): void {
            this.$emit('set-active-tab', id)
        },

        removeTab(id: number): void {
            this.$emit('remove-tab', id)
        },
    },
})
</script>
