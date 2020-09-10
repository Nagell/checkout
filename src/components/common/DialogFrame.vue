<template>
    <div class="c-dialog">
        <div class="c-dialog__container">
            <div class="c-dialog__header">
                <h2 class="c-dialog__title">{{ title }}</h2>
                <span class="c-dialog__close" @click="close">
                    <i class="fas fa-times u-fsize-xxl" />
                </span>
            </div>
            <div class="c-dialog__content">
                <!--
                    Slot for content
                    -->
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    name: 'dialogs-frame',

    props: {
        /**
         * Title label
         */
        title: {
            type: String as PropType<string>,
            default: '',
            required: false,
        },
    },

    created() {
        document.addEventListener('keydown', this.keyPressed)
    },

    destroyed() {
        document.removeEventListener('keydown', this.keyPressed)
    },

    methods: {
        close(): void {
            this.$emit('close-dialog')
        },

        keyPressed(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                this.close()
            }
        },
    },
})
</script>
