import { Currency } from '@/types/interfaces/currency'

/* Sample usage of money class:

    let moneySample1 = new money('15,4')
    let moneySample2 = new money(14.6)
        .add(moneySample1)
        .add(2)
        .sub(moneySample1)
        .mul(0.19)
    console.log(moneySample2.getAmount())           // gives 315
    console.log(moneySample2.getFormatted(true))    // gives "3,15"
    console.log(moneySample2.getFormatted())        // gives "€ 3,15"

*/

export default class money {
    private amount: number
    private currency: Currency

    constructor(amount: number | string, currency: Currency = { symbol: '€', decimal: ',' }) {
        this.amount = this.convertToAmount(amount)
        this.currency = currency
    }

    /** -----------------------------------------------------------------
     * PRIVATE METHODS
     * -----------------------------------------------------------------*/

    /**
     * Converts given value to number
     */
    private convertToNumber(val: number | string): number {
        return typeof val === 'number' ? val : parseFloat(val.replace(/[,]/g, '.'))
    }

    /**
     * Converts string or number to numeric format
     * Example: '3.44', '3,44' and 3.44 will be converted to 344
     * @param val - value of converted number
     */
    private convertToAmount(val: number | string) {
        return Math.round((this.convertToNumber(val) + 0.00001) * 100)
    }

    /** -----------------------------------------------------------------
     * GETTERS
     * -----------------------------------------------------------------*/

    /**
     * Returns amount
     */
    public getAmount(): number {
        return this.amount
    }

    /**
     * Returns currency
     */
    public getCurrency(): Currency {
        return this.currency
    }

    /**
     * Returns currency
     */
    public getFormatted(withSymbol = false): string {
        const convertedToString = (this.amount / 100).toFixed(2),
            changedDecimal = convertedToString.replace(/[.]/g, this.currency.decimal)

        return withSymbol ? this.currency.symbol + ' ' + changedDecimal : changedDecimal
    }

    /** -----------------------------------------------------------------
     * OPERATIONS
     * -----------------------------------------------------------------*/

    /**
     * Adds a value to the amount
     */
    public add(val: number | string | money): money {
        if (val instanceof money) {
            this.amount += val.amount
        } else {
            this.amount += this.convertToAmount(val)
        }
        return this
    }

    /**
     * Subtract a value from the amount
     */
    public sub(val: number | string | money): money {
        if (val instanceof money) {
            this.amount -= val.amount
        } else {
            this.amount -= this.convertToAmount(val)
        }
        return this
    }

    /**
     * Multiplies an amount
     */
    public mul(val: number | string): money {
        this.amount = Math.round((this.amount * 100.00001 * this.convertToNumber(val)) / 100)

        return this
    }
}
