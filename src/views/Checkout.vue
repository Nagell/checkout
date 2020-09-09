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
/* types */
import { KeyClicked } from '@/types'
/* classes */
import money from '@/classes/money'
/* components */
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
        /**
         * Id of a tab in which this component is placed
         */
        tabId: {
            type: Number as PropType<number>,
            default: 0,
            required: true,
        },
    },

    data() {
        return {
            toPay: null as null | money,
            payment: null as null | money,
            tempPayment: '' as string,
            rest: null as null | money,
        }
    },

    computed: {
        payDisable(): boolean {
            return !this.payment || !this.toPay || this.payment.getAmount() < this.toPay.getAmount()
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
                    this.rest = null
                }
            } else {
                payment = key
            }

            this.tempPayment = payment
            this.payment = new money(payment, true)
        },

        setToPay(val: string): void {
            this.toPay = new money(val)
        },

        pay(): void {
            this.rest =
                this.payment !== null &&
                this.toPay !== null &&
                this.payment.getAmount() >= this.toPay.getAmount()
                    ? new money(this.payment.getAmount(), true, this.payment.getCurrency()).sub(
                          this.toPay
                      )
                    : null
        },
    },
})
</script>
