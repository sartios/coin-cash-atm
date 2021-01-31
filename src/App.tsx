import React from 'react';

import { CssBaseline, Paper, Grid, makeStyles } from '@material-ui/core';

import { ReactComponent as Logo } from './assets/logo.svg';

import { NumPad, WalletBalance } from './components';

const useStyles = makeStyles({
  container: {
    justifyContent: 'center'
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10
  },
  paper: {
    height: 600
  },
  numPad: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end'
  },
  balance: { height: '100%', display: 'flex', marginTop: 50, marginLeft: 10 }
});

function App() {
  const classes = useStyles();

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
                <WalletBalance value={24687.32} />
              </Grid>
              <Grid item xs={5} className={classes.numPad}>
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
