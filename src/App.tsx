import React, { useState } from 'react';

import { CssBaseline, Paper, Grid, makeStyles } from '@material-ui/core';

import { ReactComponent as Logo } from './assets/logo.svg';
import { NumPad, WalletBalance, Input, Receipt } from './components';
import { coinChange, initialSupply, calcCashAvailability, toDollars } from './utils';

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: 'center'
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10
  },
  paper: {
    height: 600,
    borderRadius: 14,
    [theme.breakpoints.down('sm')]: {
      height: 'max-content',
      paddingRight: 24,
      paddingLeft: 24,
      paddingBottom: 40
    }
  },
  numPadContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: 50,
    paddingBottom: 10
  },
  balance: {
    height: '100%',
    display: 'flex',
    marginTop: 50,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  numPad: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

// Error message when the amount that user enters is greater than wallet's balance
const getBalanceErrorMessage = (balance: number) =>
  `You cannot exceed wallet's balance: ${toDollars(balance)}`;

// Error message for when the ATM can not serve the requested amount and the wallet has the balance.
// The message suggests the max amount the user can withdraw.
// To test this case, reduce the ATM's initial availability.
const getAtmCashErrorMessage = (maxAmount: number) =>
  `ATM can disperse up to  ${toDollars(maxAmount)}`;

function App() {
  const classes = useStyles();
  // Wallet's balance
  const [balance, setBalance] = useState<number>(24687.32);
  // Whether an error has been occurred. It can be removed and use the error message instead.
  const [error, setError] = useState<boolean>(false);
  // Show transaction's receipt
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  // The actual error message. Currently, there are 2 error messages that may occur.
  const [errorMessage, setErrorMessage] = useState<string>('');
  // The amount to withdraw
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  // The total amount that the atm can disperse as a cached number
  const [atmTotalCash, setAtmTotalCash] = useState<number>(calcCashAvailability(initialSupply));
  // The new supply of the ATM once the user withdrew money
  const [cashSupply, setCashSupply] = useState<number[][]>(initialSupply);
  // How the amount to withdraw will be served
  const [amountBreakdown, setAmountBreakdown] = useState<number[]>([]);

  const clearError = () => {
    setError(false);
    setErrorMessage('');
  };

  const changeWithdrawAmount = (value: string): void => {
    const valueAsInt = parseInt(value, 10);

    const regexp = new RegExp(/^\d*?$/);

    if (Number.isNaN(valueAsInt)) {
      setWithdrawAmount('');
      clearError();
    } else if (regexp.test(value)) {
      if (atmTotalCash >= valueAsInt && balance >= valueAsInt) {
        // Cash availability & possible amount
        setWithdrawAmount(value);
        clearError();
      } else if (atmTotalCash <= valueAsInt && balance >= valueAsInt) {
        // Possible amount but not cash availability
        setError(true);
        setErrorMessage(getAtmCashErrorMessage(atmTotalCash));
      } else if (balance <= valueAsInt) {
        // Bad amount
        setError(true);
        setErrorMessage(getBalanceErrorMessage(balance));
      }
    }
  };

  const changeWithdrawAmountFromNumPad = (value: number | string): void => {
    const newValue = `${withdrawAmount}${value}`;
    changeWithdrawAmount(newValue);
  };

  const disperseAmount = () => {
    const amount = parseInt(withdrawAmount, 10);
    if (!Number.isNaN(amount) && amount > 0) {
      const { result, newSupply } = coinChange(amount, cashSupply, []);
      setBalance(balance - amount);
      setCashSupply(newSupply);
      setAtmTotalCash(calcCashAvailability(newSupply));
      setAmountBreakdown(result);
      setShowReceipt(true);
      clearError();
    }

    if (amount === 0) {
      setError(true);
      setErrorMessage('Please enter a valid amount');
    }
  };

  const clearAmount = () => {
    setWithdrawAmount('');
    clearError();
  };

  const cancelProcess = () => {
    console.log('cancel process');
  };

  const newTransaction = () => {
    setWithdrawAmount('');
    setShowReceipt(false);
    setAmountBreakdown([]);
    clearError();
  };

  return (
    <div>
      <CssBaseline />
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} md={10} lg={8} className={classes.item}>
          <Paper className={classes.paper}>
            <Grid container style={{ height: '100%' }}>
              <Grid xs={12} md={6} className={classes.balance}>
                <WalletBalance value={balance} />
              </Grid>
              <Grid item xs={12} md={5} className={classes.numPadContainer}>
                {!showReceipt && (
                  <Input
                    error={error}
                    errorMessage={errorMessage}
                    value={withdrawAmount}
                    onChange={changeWithdrawAmount}
                    onSubmit={disperseAmount}
                  />
                )}
                {showReceipt && (
                  <Receipt
                    cash={amountBreakdown}
                    total={withdrawAmount}
                    newTransaction={newTransaction}
                  />
                )}
                {!showReceipt && (
                  <NumPad
                    className={classes.numPad}
                    onNumClick={changeWithdrawAmountFromNumPad}
                    actions={{
                      disperseAmount,
                      clearAmount,
                      cancelProcess
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
