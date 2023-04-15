import { BigNumber } from "ethers"
import Big from "big.js"

export function big2BigNum(val: Big, decimals: number): BigNumber {
    return BigNumber.from(val.mul(new Big(10).pow(decimals)).toFixed(0))
}

export function bigNum2Big(val: BigNumber, decimals: number): Big {
    return new Big(val.toString()).div(new Big(10).pow(decimals))
}
