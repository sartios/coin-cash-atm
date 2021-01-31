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
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);

  const changeWithdrawAmount = (value: string): void => {
    if (!value) {
      setWithdrawAmount(null);
      setError(false);
    } else if (balance >= parseFloat(value)) {
      setWithdrawAmount(parseFloat(parseFloat(value).toFixed(2)));
      setError(false);
    } else {
      setError(true);
    }
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
                  maxBalance={balance}
                  error={error}
                  errorMessage="You cannot exceed wallet's balance"
                  value={withdrawAmount || 0}
                  onChange={changeWithdrawAmount}
                />
                <NumPad />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
