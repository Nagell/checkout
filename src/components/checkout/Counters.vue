<template>
    <div class="c-counters">
        <div class="c-counters__container">
            <div :class="nonRestStyle">
                <label for="to-pay">Zu zahlen</label>
                <input
                    id="to-pay"
                    class="c-counters__input"
                    disabled
                    type="text"
                    :value="renderWithCurrency(toPay.toFixed(2))"
                />
            </div>
            <div :class="nonRestStyle">
                <label for="payment">Gegeben</label>
                <input
                    id="payment"
                    class="c-counters__input"
                    disabled
                    type="text"
                    :value="renderWithCurrency(payment)"
                />
            </div>
            <div class="c-counters__container-inner">
                <label v-if="rest" for="rest">Rest</label>
                <input
                    id="rest"
                    v-if="rest"
                    class="c-counters__input"
                    disabled
                    type="text"
                    :value="renderWithCurrency(rest)"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'counters',

    props: {
        toPay: {
            type: [Number, String],
            default: 0,
            required: false,
        },
        payment: {
            type: [Number, String],
            default: 0,
            required: false,
        },
        rest: {
            type: [Number, String],
            default: 0,
            required: false,
        },
    },

    computed: {
        nonRestStyle() {
            return ['c-counters__container-inner', this.rest ? 'transparent' : '']
        },
    },

    methods: {
        renderWithCurrency(val) {
            return parseFloat(val) > 0 ? '€' + ' ' + val.toString() : ''
        },
    },
}
</script>
