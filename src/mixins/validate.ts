export default {
    name: 'ValidateMixin',

    methods: {
        /*------------------------------------------
         *  Validate numbers
         *------------------------------------------*/

        /**
         * Validates given value and returns true if it's a number greater than 0
         */
        mx_validate_positiveNumber(val: string): boolean {
            return this.$_mx_validate_number(val) && Number.parseFloat(val.replace(/,/g, '.')) > 0
        },

        /**
         * Validates given value and returns true if it is a number greater or equal 0
         */
        mx_validate_notNegativeNumber(val: string): boolean {
            return this.$_mx_validate_number(val) && Number.parseFloat(val.replace(/,/g, '.')) >= 0
        },

        /**
         * Validates given value and returns true if it is a number (also not empty)
         */
        $_mx_validate_number(val: string): boolean {
            return (
                /^[-+]?\d+([\,][0-9])?\d*$/.test(val) &&
                !Number.isNaN(Number.parseFloat(val.replace(/,/g, '.'))) &&
                val != ''
            )
        },
    },
}
