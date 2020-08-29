<template>
	<div>
		<counters />
		<sample-payments />
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
}
</script>
