export interface Result {
    payment: number
    difference: number
    banknotesAmount: number
    payments: string
}

export interface PrepareResult {
    targetAmount: number
    sum: number
    payments: number[]
}

export interface ReducedResult {
    payment: number
    difference: number
    banknotesAmount: number
}

export interface Tab {
    id: number
    name: string
    icon: string
    toPay: number
}
