<template>
	<div />
</template>

<script>
import config from '@/config'

export default {
	name: 'sample-payments',
	data: function() {
		return {
			config: config,
			targetAmount: 89.9,
			results: [],
		}
	},

	created() {
		this.countPossiblePayments(this.targetAmount)
	},
	methods: {
		countPossiblePayments(targetAmount) {
			let availableValues = [...config.moneyValues],
				payments = [],
				pointer = 0,
				sum = 0

			while (availableValues.length > 0) {
				// if the pointer is outside an array it's finished
				while (!(pointer === availableValues.length)) {
					if (sum < targetAmount) {
						sum += availableValues[pointer]
						payments.push(availableValues[pointer])
					} else {
						this.saveResult({
							targetAmount,
							sum,
							payments,
						})
						// remove last payment
						sum -= availableValues[pointer]
						payments.pop()
						//move pointer to add smaller amounts in next steps
						pointer++
					}
				}
				// reduce an array with available banknotes array
				availableValues.shift()
				// reset helper variables
				payments = []
				pointer = 0
				sum = 0
			}
			console.table(JSON.parse(JSON.stringify(this.results)))
		},

		saveResult(payload = { targetAmount: 0, sum: 0, payments: [] }) {
			this.results.push({
				payment: payload.sum,
				difference: Math.round((payload.sum - payload.targetAmount) * 100) / 100,
				banknotesAmount: payload.payments.length,
				payments: JSON.stringify([...payload.payments]),
			})
		},
	},
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
