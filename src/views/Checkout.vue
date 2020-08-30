<template>
	<div class="c-checkout">
		<div class="c-checkout__counters">
			<counters :to-pay="toPay" :payment="payment" />
		</div>
		<div class="c-checkout__payments">
			<div class="c-checkout__empty" />
			<div class="c-checkout__samples">
				<sample-payments :to-pay="toPay" @key-clicked="keyClicked" />
			</div>
			<div class="c-checkout__keyboard">
				<keyboard @key-clicked="keyClicked" />
			</div>
			<div class="c-checkout__pay">
				<button>Zahlen</button>
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
	},

	data() {
		return {
			payment: '',
			tempPayment: '',
		}
	},

	methods: {
		keyClicked(payload) {
			let key = payload.key,
				sample = payload.sample

			if (!sample) {
				// TODO: rework to switch
				if (key !== 'backspace') {
					this.tempPayment = this.tempPayment.toString() + payload.key
				} else if (key === 'backspace') {
					this.tempPayment = this.tempPayment.toString().slice(0, -1)
				}
			} else {
				this.tempPayment = key.toString()
			}

			this.payment = (parseFloat(this.tempPayment) / 100).toFixed(2)
		},
	},
}
</script>
