import React from 'react';

import { CssBaseline, Paper, Grid, makeStyles } from '@material-ui/core';

import { ReactComponent as Logo } from './assets/logo.svg';

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
  }
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
        <Grid item xs={6} className={classes.item}>
          <Paper className={classes.paper}>Hello</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
