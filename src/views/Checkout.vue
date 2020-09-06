<template>
    <div class="c-checkout">
        <div class="c-checkout__counters">
            <counters :to-pay="toPay" :payment="payment" :rest="rest" />
        </div>
        <div class="c-checkout__payments">
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
                    <sample-payments :to-pay="toPay" :tab-id="tabId" @key-clicked="keyClicked" />
                </div>
                <div class="c-checkout__keyboard">
                    <keyboard @key-clicked="keyClicked" />
                </div>
                <div class="c-checkout__pay">
                    <button :disabled="payDisable" @click="pay">Zahlen</button>
                </div>
            </div>
        </div>
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
        toPay: {
            type: Number as PropType<number>,
            default: 0,
            required: true,
        },
        tabId: {
            type: Number as PropType<number>,
            default: 0,
            required: true,
        },
    },

    data() {
        return {
            payment: '' as string,
            tempPayment: '' as string,
            rest: 0 as number | string,
        }
    },

    computed: {
        payDisable(): boolean {
            return !this.payment || parseFloat(this.payment) < this.toPay
        },
    },

    methods: {
        keyClicked(payload: KeyClicked): void {
            let key = payload.key.toString(),
                sample = payload.sample,
                payment = this.tempPayment.toString()

            if (!sample) {
                if (key !== 'backspace') {
                    payment = payment + payload.key
                } else {
                    payment = payment.slice(0, -1)
                    this.rest = ''
                }
            } else {
                payment = key
            }

            this.tempPayment = payment
            this.payment = payment !== '' ? (parseFloat(payment) / 100).toFixed(2) : ''
        },

        pay(): void {
            this.rest =
                this.payment && Number(parseFloat(this.payment)) > this.toPay
                    ? Number(parseFloat(this.payment) - this.toPay).toFixed(2)
                    : 0
        },
    },
})
</script>
