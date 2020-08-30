<template>
	<div>
		{{ toPay }}
	</div>
</template>

<script>
export default {
	name: 'counters',

	props: {
		toPay: {
			type: Number,
			default: 0,
			required: true,
		},
	},
}
</script>
