export type DecimalSeparator = ',' | '.' | ' '

export interface Currency {
    symbol: string
    decimal: DecimalSeparator
}
