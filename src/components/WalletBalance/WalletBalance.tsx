import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import { ReactComponent as BTCLogo } from '../../assets/btc_logo.svg';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: 339,
    height: 168,
    backgroundColor: '#2C254A',
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    position: 'absolute',
    left: '50%',
    top: '-50%',
    transform: 'translate(-50%, 20%)'
  },
  balance: {
    fontWeight: 600,
    fontSize: 30,
    cursor: 'pointer',
    userSelect: 'none'
  }
});

interface Props {
  value: number;
}

const BTC_US_DOLLAR = 33612.2;

const WalletBalance = ({ value = 24079 }: Props) => {
  const [mode, setMode] = useState(0);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BTCLogo className={classes.logo} />
      <span className={classes.balance} onClick={() => setMode(mode < 2 ? mode + 1 : 0)}>
        {mode === 0 &&
          `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}`}
        {mode === 1 && `${(value / BTC_US_DOLLAR).toFixed(4)} BTC`}
        {mode === 2 &&
          `${new Intl.NumberFormat().format(Math.round((value * 1e8) / BTC_US_DOLLAR))} sats`}
      </span>
    </div>
  );
};

export default WalletBalance;
