<template>
    <div class="c-counters">
        <div class="c-counters__container">
            <input-field
                v-model="inputToPay"
                id="to-pay"
                :focus-on-mount="true"
                :validate="
                    v => {
                        return mx_validate_positiveNumber(v)
                    }
                "
                :is-custom-v-model="true"
                :disabled="disableToPay"
                prefix="€"
                label="Zu zahlen"
                @key-down="keyDown"
            />
            <input-field
                v-model="inputPayment"
                id="payment"
                :disabled="true"
                :is-custom-v-model="true"
                :prefix="payment ? payment.getCurrency().symbol : ''"
                label="Gegeben"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
/* types */
import { InputPayload } from '@/types'
/* classes */
import money from '@/classes/money'
/* mixins */
import MixinValidate from '@/mixins/validate'
/* components */
import InputField from '@/components/common/InputField.vue'

export default Vue.extend({
    name: 'counters',

    components: {
        InputField,
    },

    mixins: [MixinValidate],

    props: {
        /**
         * Amount of money to pay
         */
        toPay: {
            type: Object as PropType<null | money>,
            default: null,
            required: false,
        },
        /**
         * Amount of payed money
         */
        payment: {
            type: Object as PropType<null | money>,
            default: null,
            required: false,
        },
    },

    data() {
        return {
            tempToPay: '' as string,
            disableToPay: false as boolean,
        }
    },

    computed: {
        inputToPay: {
            get(): string {
                return this.tempToPay
            },
            set(payload: InputPayload) {
                this.$emit('set-to-pay', payload.value)
                if (!payload.error && typeof payload.value === 'string') {
                    this.tempToPay = payload.value
                }
            },
        },

        inputPayment: {
            get(): string | null {
                return this.payment ? this.payment.getFormatted() : null
            },
        },
    },

    watch: {
        toPay: function(val: null | money) {
            this.tempToPay =
                val !== null
                    ? new money(val.getAmount(), true, val.getCurrency()).getFormatted()
                    : ''
        },
    },

    methods: {
        keyDown(e: KeyboardEvent): void {
            if (e.key === 'Enter') {
                this.tempToPay = new money(this.tempToPay.toString()).getFormatted()
                this.$emit('confirm-to-pay', this.tempToPay)
                this.disableToPay = true
            }
        },
    },
})
</script>
