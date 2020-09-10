<template>
    <div class="c-checkout">
        <div class="c-checkout__counters">
            <counters
                :to-pay="toPay"
                :payment="payment"
                @set-to-pay="setToPay"
                @confirm-to-pay="confirmToPay"
            />
        </div>
        <transition name="c-checkout__payments">
            <div v-show="showKeyboard" class="c-checkout__payments">
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
                        <transition name="c-sample-payments">
                            <sample-payments
                                v-if="showSamplePayments"
                                :to-pay="toPay"
                                :tab-id="tabId"
                                @key-clicked="keyClicked"
                            />
                        </transition>
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
            rest: null as null | money,
            tempAmount: '' as string,
            showKeyboard: false as boolean,
            showSamplePayments: false as boolean,
            currentField: 'toPay' as string,
        }
    },

    computed: {
        payDisable(): boolean {
            return !this.payment || !this.toPay || this.payment.getAmount() < this.toPay.getAmount()
        },
    },

    mounted() {
        this.showKeyboard = true
    },

    methods: {
        keyClicked(payload: KeyClicked): void {
            let key = payload.value,
                sample = payload.sample,
                amount = this.tempAmount

            if (!sample) {
                if (key !== 'backspace') {
                    amount += payload.value
                } else {
                    amount = amount.slice(0, -1)
                }
            } else {
                amount = key
            }

            this.tempAmount = amount

            switch (this.currentField) {
                case 'toPay':
                    this.toPay = new money(amount, true)
                    break
                case 'payment':
                    this.payment = new money(amount, true)
                    break
            }
        },

        setToPay(val: string) {
            this.tempAmount = val ? new money(val, true).getAmount().toString() : ''
        },

        confirmToPay(val: string): void {
            this.currentField = 'payment'
            this.tempAmount = ''
            this.toPay = new money(val)
            this.showSamplePayments = true
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

            if (this.rest !== null) {
                this.$emit('set-rest', this.rest)
            }
        },
    },
})
</script>
