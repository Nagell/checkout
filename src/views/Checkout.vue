<template>
    <div class="c-checkout">
        <div class="c-checkout__counters">
            <counters :payment="payment" :rest="rest" @set-to-pay="setToPay" />
        </div>
        <transition name="c-checkout__payments">
            <div v-show="toPay" class="c-checkout__payments">
                <div class="c-checkout__payments-tabs">
                    <ul>
                        <li class="active">Bar</li>
                        <li>EC</li>
                        <li>Kreditkarte</li>
                        <li>Gutschein</li>
                        <li>Sonstiges</li>
                    </ul>
                </div>
                <div class="c-checkout__payments-content">
                    <div class="c-checkout__empty" />
                    <div class="c-checkout__samples">
                        <sample-payments
                            :to-pay="toPay"
                            :tab-id="tabId"
                            @key-clicked="keyClicked"
                        />
                    </div>
                    <div class="c-checkout__keyboard">
                        <keyboard @key-clicked="keyClicked" />
                    </div>
                    <div class="c-checkout__pay">
                        <button :disabled="payDisable" @click="pay">Zahlen</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { KeyClicked } from '@/types'

import Counters from '@/components/checkout/Counters.vue'
import SamplePayments from '@/components/checkout/SamplePayments.vue'
import Keyboard from '@/components/checkout/Keyboard.vue'

export default Vue.extend({
    name: 'checkout',

    components: {
        Counters,
        SamplePayments,
        Keyboard,
    },

    props: {
        tabId: {
            type: Number as PropType<number>,
            default: 0,
            required: true,
        },
    },

    data() {
        return {
            toPay: 0 as number,
            payment: '' as string,
            tempPayment: '' as string,
            rest: '' as string,
        }
    },

    computed: {
        payDisable(): boolean {
            return !this.payment || parseFloat(this.payment) < this.toPay
        },
    },

    methods: {
        keyClicked(payload: KeyClicked): void {
            let key = payload.value,
                sample = payload.sample,
                payment = this.tempPayment

            if (!sample) {
                if (key !== 'backspace') {
                    payment = payment + payload.value
                } else {
                    payment = payment.slice(0, -1)
                    this.rest = ''
                }
            } else {
                payment = key
            }

            this.tempPayment = payment
            this.payment = (parseFloat(payment) / 100).toFixed(2)
        },

        setToPay(val: string): void {
            // TODO: currency conversion class (right now its rounded)
            this.toPay = parseFloat(val)
        },

        pay(): void {
            this.rest =
                !Number.isNaN(this.payment) && parseFloat(this.payment) > this.toPay
                    ? (parseFloat(this.payment) - this.toPay).toFixed(2)
                    : ''
        },
    },
})
</script>
