<template>
	<div class="c-counters">
		<input class="c-counters__input" disabled type="number" :value="toPay" />
		<input class="c-counters__input" disabled type="number" :value="payment" />

		<input v-if="rest" class="c-counters__input" disabled type="number" :value="rest" />
	</div>
</template>

<script>
export default {
	name: 'counters',

	props: {
		toPay: {
			type: Number,
			default: 0,
			required: false,
		},
		payment: {
			type: [Number, String],
			default: 0,
			required: false,
		},
		rest: {
			type: Number,
			default: 0,
			required: false,
		},
	},
}
</script>
