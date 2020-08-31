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

<script>
import Counters from '@/components/checkout/Counters'
import SamplePayments from '@/components/checkout/SamplePayments'
import Keyboard from '@/components/checkout/Keyboard'

export default {
    name: 'checkout',

    components: {
        Counters,
        SamplePayments,
        Keyboard,
    },

    props: {
        toPay: {
            type: Number,
            default: 0,
            required: true,
        },
        tabId: {
            type: Number,
            default: 0,
            required: true,
        },
    },

    data() {
        return {
            payment: '',
            tempPayment: '',
            rest: 0,
        }
    },

    computed: {
        payDisable() {
            return !this.payment || parseFloat(this.payment) < this.toPay
        },
    },

    methods: {
        keyClicked(payload) {
            let key = payload.key.toString(),
                sample = payload.sample,
                payment = this.tempPayment.toString()

            if (!sample) {
                // TODO: rework to switch
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

        pay() {
            this.rest =
                this.payment && this.payment > this.toPay
                    ? Number(parseFloat(this.payment) - parseFloat(this.toPay)).toFixed(2)
                    : 0
        },
    },
}
</script>
