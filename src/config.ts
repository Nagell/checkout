export default {
    // available banknotes
    moneyValues: [100, 50, 20, 10, 5, 2, 1] as number[],

    // from this amount of money people tend to pay with bigger banknotes
    // (my girlfriend says so - she worked as waitress :) )
    lazinessThreshold: 50 as number,

    // maximum reasonable amount of banknotes to be used as a payment
    maxBanknotes: 15 as number,

    keyboard: ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'backspace', '0', '00'] as string[],
}
