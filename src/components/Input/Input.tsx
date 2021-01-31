import React, { FormEvent, useEffect, useRef } from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: { height: 68 },
  input: {
    width: '100%',
    height: '100%',
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
  },
  hidden: {
    visibility: 'hidden'
  }
});

interface Props {
  maxBalance: number;
  error: boolean;
  errorMessage: string;
  onChange: (amount: string) => void;
  value: number;
}

const Input = ({ maxBalance, error, errorMessage, value, onChange }: Props) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const operation = (event: KeyboardEvent): void => {
      const preventedKeys = ['KeyE', 'Minus', 'Plus', 'Equal'];
      if (preventedKeys.indexOf(event.code) !== -1) {
        event.preventDefault();
      }

      inputRef?.current?.focus();
    };
    window.addEventListener('keypress', operation);

    return () => window.removeEventListener('keypress', operation);
  }, [inputRef]);

  const handleChange = (event: FormEvent<HTMLInputElement>): void => {
    onChange(event.currentTarget.value);
  };

  return (
    <div className={classes.root}>
      <input
        ref={inputRef}
        type="number"
        value={value.toString()}
        className={cn(classes.input)}
        autoFocus
        min={0}
        max={maxBalance}
        pattern="^\d*(\.\d{0,2})?$"
        onChange={handleChange}
      />
      <span className={cn(classes.error, { [classes.hidden]: !error })}>{errorMessage}</span>
    </div>
  );
};

export default Input;
