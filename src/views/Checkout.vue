<template>
	<div>
		<counters :to-pay="toPay" />
		<sample-payments :to-pay="toPay" />
		<keyboard />
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
}
</script>
