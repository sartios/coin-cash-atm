import React, { useState } from 'react';

import { CssBaseline, Paper, Grid, makeStyles } from '@material-ui/core';

import { ReactComponent as Logo } from './assets/logo.svg';
import { NumPad, WalletBalance, Input } from './components';
import { coinChange, initialSupply, calcCashAvailability, toDollars } from './utils';

const useStyles = makeStyles({
  container: {
    justifyContent: 'center'
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10
  },
  paper: {
    height: 600,
    borderRadius: 14
  },
  numPad: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: 50,
    paddingBottom: 10
  },
  balance: { height: '100%', display: 'flex', marginTop: 50, marginLeft: 10 }
});

const getBalanceErrorMessage = (balance: number) =>
  `You cannot exceed wallet's balance: ${toDollars(balance)}`;

const getAtmCashErrorMessage = (amount: string, maxAmount: number) =>
  `ATM can not disperse ${toDollars(amount)}. Max available amount ${toDollars(maxAmount)}`;

function App() {
  const classes = useStyles();
  const [balance] = useState<number>(24687.32);
  const [error, setError] = useState<boolean>(false);
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
        setErrorMessage(getAtmCashErrorMessage(withdrawAmount, atmTotalCash));
      }
    }
  };

  const changeWithdrawAmountFromNumPad = (value: number | string): void => {
    const newValue = `${withdrawAmount}${value}`;
    changeWithdrawAmount(newValue);
  };

  const disperseAmount = () => {
    const { result, newSupply } = coinChange(parseInt(withdrawAmount, 10), cashSupply, []);
    setCashSupply(newSupply);
    setAtmTotalCash(calcCashAvailability(newSupply));
    setAmountBreakdown(result);
    setWithdrawAmount('');
    clearError();
  };

  const clearAmount = () => {
    setWithdrawAmount('');
    clearError();
  };

  const cancelProcess = () => {
    console.log('cancel process');
  };

  return (
    <div>
      <CssBaseline />
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={8} xl={6} className={classes.item}>
          <Paper className={classes.paper}>
            <Grid container style={{ height: '100%' }}>
              <Grid xs={6} className={classes.balance}>
                <WalletBalance value={balance} />
              </Grid>
              <div>{JSON.stringify(amountBreakdown, null, 4)}</div>
              <Grid item xs={5} className={classes.numPad}>
                <Input
                  error={error}
                  errorMessage={errorMessage}
                  value={withdrawAmount}
                  onChange={changeWithdrawAmount}
                />
                <NumPad
                  onNumClick={changeWithdrawAmountFromNumPad}
                  actions={{
                    disperseAmount,
                    clearAmount,
                    cancelProcess
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
