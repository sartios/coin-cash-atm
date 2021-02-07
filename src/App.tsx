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

const getBalanceErrorMessage = (balance: number) =>
  `You cannot exceed wallet's balance: ${toDollars(balance)}`;

const getAtmCashErrorMessage = (maxAmount: number) =>
  `ATM can disperse up to  ${toDollars(maxAmount)}`;

function App() {
  const classes = useStyles();
  const [balance, setBalance] = useState<number>(24687.32);
  const [error, setError] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [atmTotalCash, setAtmTotalCash] = useState<number>(calcCashAvailability(initialSupply));
  const [cashSupply, setCashSupply] = useState<number[][]>(initialSupply);
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
      if (atmTotalCash >= valueAsInt) {
        if (balance >= valueAsInt) {
          setWithdrawAmount(value);
          clearError();
        } else {
          setError(true);
          setErrorMessage(getBalanceErrorMessage(balance));
        }
      } else {
        setError(true);
        setErrorMessage(getAtmCashErrorMessage(atmTotalCash));
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

        <Grid item xs={12} xl={6} className={classes.item}>
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
