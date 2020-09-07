<template>
    <div class="c-counters">
        <div class="c-counters__container">
            <div :class="nonRestStyle">
                <label for="to-pay">Zu zahlen</label>
                <input
                    v-model="toPay"
                    id="to-pay"
                    class="c-counters__input"
                    type="number"
                    step="0.01"
                    @keydown.enter.prevent="toPayConfirmed"
                />
                <span>€</span>
            </div>
            <div :class="nonRestStyle">
                <label for="payment">Gegeben</label>
                <input
                    id="payment"
                    class="c-counters__input"
                    disabled
                    type="number"
                    :value="payment"
                />
                <span v-if="payment">€</span>
            </div>
            <div v-if="rest" class="c-counters__container-inner">
                <label for="rest">Rest</label>
                <input id="rest" class="c-counters__input" disabled type="number" :value="rest" />
                <span>€</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    name: 'counters',

    props: {
        payment: {
            type: String as PropType<null | string>,
            default: 0,
            required: false,
        },
        rest: {
            type: String as PropType<null | string>,
            default: null,
            required: false,
        },
    },

    data() {
        return {
            tempToPay: 0 as number | typeof NaN,
        }
    },

    computed: {
        nonRestStyle(): string[] {
            return ['c-counters__container-inner', this.rest ? 'transparent' : '']
        },
        toPay: {
            get(): number {
                return this.tempToPay
            },
            set(val: number | string) {
                // value has to be checked if it's a string beacuse of the differences between browsers
                this.tempToPay = typeof val === 'string' ? parseFloat(val.replace(/,/g, '.')) : val
            },
        },
    },
    methods: {
        toPayConfirmed(): void {
            if (!Number.isNaN(this.tempToPay) && this.tempToPay > 0) {
                this.$emit('set-to-pay', this.tempToPay)
            }
        },
    },
})
</script>
