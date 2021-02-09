# Utils

This folder contains algorithms and other utils used in components

## coinChange

### initialSupply

The ATM's initial supply: `[[noteOrCoinValue, howManyItems],...]`

### calcCashAvailability

Reduces the ATM's supply and returns the sum. Each value is multiplied by the number of instances.

### coinChange

Recursively find the biggest available denominator and reduce its supply.
When supply reaches zero, then take the next biggest available denominator.
This way we make sure that the ATM does not run out of small notes or coins when it can satisfy the amount with larger values.

When the amount to withdraw can not be satisfied by the ATM, it will return the maximum amount that it can serve in order to suggest another amount that serves user's need.

## quickSort

Quick sort algorithm implementation to sort an array of string values which represent integer values. The algorithm works either in desc or asc mode.

## toDollars

Currently, the default fiat currency is USD and the Intl browser API is used to convert an amount into dollars

[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
