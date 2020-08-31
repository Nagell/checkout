<template>
    <div class="c-sample-payments">
        <ul>
            <li
                :key="key"
                v-for="(result, key) in resultsToRender.slice().reverse()"
                @click="keyClicked(result.payment * 100)"
            >
                € {{ result.payment.toFixed(2) }}
            </li>
        </ul>
    </div>
</template>

<script>
import config from '@/config'

export default {
    name: 'sample-payments',

    props: {
        toPay: {
            type: Number,
            default: 0,
            required: true,
        },
    },

    data: function() {
        return {
            config: config,
            resultsToRender: [],
        }
    },

    created() {
        this.countPossiblePayments(this.toPay)
            .then(this.reduceResults)
            .then(this.choseBestResults)
            .then(results => {
                this.resultsToRender = results
            })
            .catch(error => console.log(error))
    },

    methods: {
        async countPossiblePayments(targetAmount) {
            return await new Promise((resolve, reject) => {
                let availableValues = [...config.moneyValues],
                    payments = [],
                    pointer = 0,
                    sum = 0,
                    results = []

                while (availableValues.length > 0) {
                    // if the pointer is outside an array
                    // or the amount of banknotes is bigger then 15 (unrealistic) it's finished;
                    while (!(pointer === availableValues.length) && payments.length < 15) {
                        if (sum < targetAmount) {
                            sum += availableValues[pointer]
                            payments.push(availableValues[pointer])
                        } else {
                            results.push(
                                this.prepareResultObject({
                                    targetAmount,
                                    sum,
                                    payments,
                                })
                            )
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

                this.$devLog.log('To pay: ', this.toPay)
                this.$devLog.table(JSON.parse(JSON.stringify(results)))
                resolve(results)
            })
        },

        prepareResultObject(payload = { targetAmount: 0, sum: 0, payments: [] }) {
            return {
                payment: payload.sum,
                difference: Math.round((payload.sum - payload.targetAmount) * 100) / 100,
                banknotesAmount: payload.payments.length,
                payments: JSON.stringify([...payload.payments]),
            }
        },

        reduceResults(results) {
            let modifiedresults = results
                // sort results
                .sort((a, b) => {
                    return a.payment - b.payment
                })
                // reduce amount of data
                .reduce((acc, obj) => {
                    acc.push({
                        payment: obj.payment,
                        difference: obj.difference,
                        banknotesAmount: obj.banknotesAmount,
                    })
                    return acc
                }, [])
                // reduce to only unique values
                // (because of the sorting before those that stay after this step have also the smallest banknotesAmount)
                .reduce((acc, obj) => {
                    if (acc.length > 0) {
                        if (acc[acc.length - 1].payment !== obj.payment) {
                            acc.push(obj)
                        }
                    } else {
                        acc.push(obj)
                    }
                    return acc
                }, [])
            return modifiedresults
        },

        choseBestResults(results) {
            // reduce results to the 4 best ones
            while (results.length > 4) {
                this.toPay > config.lazinessThreshold ? results.shift() : results.pop()
            }

            this.$devLog.log('Best fitting results:')
            this.$devLog.table(JSON.parse(JSON.stringify(results)))

            let isToPayInResults = results.find(result => result.payment === this.toPay)

            let resultsToRender = isToPayInResults
                ? [...results]
                : [
                      {
                          payment: this.toPay,
                          difference: 0,
                      },
                      ...results,
                  ]
            return resultsToRender
        },

        keyClicked(key) {
            this.$emit('key-clicked', { key: key, sample: true })
        },
    },
}
</script>
