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

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Result, PrepareResult, ReducedResult } from '@/types'

import config from '@/config'

export default Vue.extend({
    name: 'sample-payments',

    props: {
        toPay: {
            type: Number as PropType<number>,
            default: 0,
            required: true,
        },
        tabId: {
            type: Number as PropType<number>,
            default: 0,
            required: true,
        },
    },

    data: function() {
        return {
            config: config,
            resultsToRender: [] as ReducedResult[],
        }
    },

    watch: {
        toPay: function(val: number) {
            if (val !== 0) {
                this.countPossiblePayments(val)
                    .then(this.reduceResults)
                    .then(this.choseBestResults)
                    .then(results => {
                        this.resultsToRender = results
                    })
                    .catch(error => console.log(error))
            }
        },
    },

    methods: {
        async countPossiblePayments(targetAmount: number): Promise<Result[]> {
            return await new Promise(resolve => {
                let availableValues = [...config.moneyValues],
                    payments = [],
                    pointer = 0,
                    sum = 0,
                    results = []

                while (availableValues.length > 0) {
                    // if the pointer is outside an array
                    // or the amount of banknotes is bigger then the resonable amount it's finnished;
                    while (
                        !(pointer === availableValues.length) &&
                        payments.length < config.maxBanknotes
                    ) {
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
                this.$devLog.log(
                    `\n\n\n%c---- Results from tab ${this.tabId} ----------------`,
                    'background: #222; color: #bada55; font-size: 16px;'
                )
                this.$devLog.log('\nTo pay: ', this.toPay)
                this.$devLog.log('\nGenerated predictions:')
                this.$devLog.table(JSON.parse(JSON.stringify(results)))
                resolve(results)
            })
        },

        prepareResultObject(payload: PrepareResult): Result {
            return {
                payment: payload.sum,
                difference: Math.round((payload.sum - payload.targetAmount) * 100) / 100,
                banknotesAmount: payload.payments.length,
                payments: JSON.stringify([...payload.payments]),
            }
        },

        reduceResults(results: Result[]): ReducedResult[] {
            let modifiedresults = results
                // sort results
                .sort((a: Result, b: Result) => {
                    return a.payment - b.payment
                })
                // reduce amount of data
                .reduce((acc: ReducedResult[], obj: Result) => {
                    acc.push({
                        payment: obj.payment,
                        difference: obj.difference,
                        banknotesAmount: obj.banknotesAmount,
                    })
                    return acc
                }, [])
                // reduce to only unique values
                // (because of the sorting before those that stay after this step have also the smallest banknotesAmount)
                .reduce((acc: ReducedResult[], obj: ReducedResult) => {
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

        choseBestResults(results: ReducedResult[]): ReducedResult[] {
            // reduce results to the 4 best ones
            while (results.length > 4) {
                if (this.toPay > config.lazinessThreshold) {
                    results.shift()
                } else {
                    results.pop()
                }
            }

            this.$devLog.log('\nBest fitting results:')
            this.$devLog.table(JSON.parse(JSON.stringify(results)))

            let isToPayInResults = results.find(result => result.payment === this.toPay)

            let resultsToRender = isToPayInResults
                ? [...results]
                : [
                      {
                          payment: this.toPay,
                          difference: 0,
                          banknotesAmount: 0,
                      },
                      ...results,
                  ]
            return resultsToRender
        },

        keyClicked(value: string): void {
            this.$emit('key-clicked', { value: value.toString(), sample: true })
        },
    },
})
</script>
