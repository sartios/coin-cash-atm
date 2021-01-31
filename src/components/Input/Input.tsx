import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 68,
    borderRadius: 14,
    border: 'none',
    background: '#1E1839',
    color: '#71B945',
    fontSize: 16,
    textAlign: 'center',
    outline: 'none',
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },
  error: {
    color: '#FF5757'
  }
});

interface Props {
  maxBalance: number;
  error: boolean;
}

const Input = ({ maxBalance, error }: Props) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const operation = () => {
      inputRef?.current?.focus();
    };
    window.addEventListener('keypress', operation);

    return () => window.removeEventListener('keypress', operation);
  }, [inputRef]);

  return (
    <input
      ref={inputRef}
      type="number"
      className={cn(classes.root, { [classes.error]: error })}
      autoFocus
      min={0}
      max={maxBalance}
      pattern="^\d*(\.\d{0,2})?$"
    />
  );
};

export default Input;
