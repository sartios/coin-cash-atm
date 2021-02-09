# Components

This folder contains shared components

## Button

A wrapper over material ui Button with custom styles

## Input

An HTML input to enter and render the amount to withdraw. The type is tel so in mobile devices renders the num keyboard and to be able to focus at the end of line. The number type can not be focused at the end of line.

Also, the input registers an operation on KeyboardEvent in order to submit with enter and prevent keys that are available for the tel input type.

## NumPad

A custom num pad that is rendered in the desktop version and makes easier to select large amounts.

## Receipt

A receipt for the transaction with the ability to generate a new transaction either by pressing enter in desktop or by using the button.

## WalletBalance

The balance of the wallet. It provides a realtime conversion to BTC and sats with a hardcoded USD parity.
