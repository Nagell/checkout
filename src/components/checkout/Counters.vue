<template>
    <div class="c-counters">
        <div class="c-counters__container">
            <input-field
                v-model="toPay"
                id="to-pay"
                :focus-on-mount="true"
                :validate="
                    v => {
                        return mx_validate_positiveNumber(v)
                    }
                "
                :is-custom-v-model="true"
                prefix="€"
                label="Zu zahlen"
                @key-down="toPayConfirmed"
            />
            <div :class="nonRestStyle">
                <label for="payment">Gegeben</label>
                <input id="payment" disabled type="number" :value="payment" />
                <span v-if="payment">€</span>
            </div>
            <div v-if="rest" class="c-input-field">
                <label for="rest">Rest</label>
                <input id="rest" disabled type="number" :value="rest" />
                <span>€</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import MixinValidate from '@/mixins/validate'

import { InputPayload } from '@/types'

import InputField from '@/components/common/InputField.vue'

export default Vue.extend({
    name: 'counters',

    components: {
        InputField,
    },

    mixins: [MixinValidate],

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
            tempToPay: '' as string,
            tempTest: '' as string,
        }
    },

    computed: {
        nonRestStyle(): string[] {
            return ['c-input-field', this.rest ? 'transparent' : '']
        },
        toPay: {
            get(): string {
                return this.tempToPay
            },
            set(payload: InputPayload) {
                if (!payload.error && typeof payload.value === 'string') {
                    this.tempToPay = payload.value
                }
            },
        },
    },
    methods: {
        toPayConfirmed(e: KeyboardEvent): void {
            console.log(e)
            if (e.key === 'Enter') {
                this.$emit('set-to-pay', this.tempToPay)
            }
        },
    },
})
</script>
