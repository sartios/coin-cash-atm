import React, { useState } from 'react';

import { CssBaseline, Paper, Grid, makeStyles } from '@material-ui/core';

import { ReactComponent as Logo } from './assets/logo.svg';

import { NumPad, WalletBalance, Input } from './components';

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

function App() {
  const classes = useStyles();
  const [balance] = useState(24687.32);
  const [error, setError] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');

  const changeWithdrawAmount = (value: string): boolean => {
    //const floatValue = parseFloat(value);

    const regexp = new RegExp(/^\d*(\.\d{0,2})?$/);

    if (Number.isNaN(parseFloat(value))) {
      setWithdrawAmount('');
      setError(false);
    } else if (regexp.test(value)) {
      if (balance >= parseFloat(value)) {
        setWithdrawAmount(value);
        setError(false);
      } else {
        setError(true);
      }
    }

    return true;
  };

  const changeWithdrawAmountFromNumPad = (value: number | string): void => {
    const newValue = `${withdrawAmount}${value}`;
    changeWithdrawAmount(newValue);
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
              <Grid item xs={5} className={classes.numPad}>
                <Input
                  error={error}
                  errorMessage="You cannot exceed wallet's balance"
                  value={withdrawAmount}
                  onChange={changeWithdrawAmount}
                />
                <NumPad onNumClick={changeWithdrawAmountFromNumPad} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
