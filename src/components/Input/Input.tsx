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
  error: boolean;
  errorMessage: string;
  value: string;
  onChange: (amount: string) => void;
  onSubmit: () => void;
}

const Input = ({ error, errorMessage, value, onChange, onSubmit }: Props) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const operation = (event: KeyboardEvent): void => {
      const preventedKeys = ['KeyE', 'Minus', 'Plus', 'Equal', 'NumpadDecimal', 'Period'];

      if (preventedKeys.indexOf(event.code) !== -1) {
        event.preventDefault();
      }

      if (event.key === 'Enter') {
        onSubmit();
      }

      inputRef?.current?.focus();
      inputRef?.current?.setSelectionRange(
        inputRef?.current?.value?.length,
        inputRef?.current?.value?.length
      );
    };

    window.addEventListener('keypress', operation);

    return () => window.removeEventListener('keypress', operation);
  }, [inputRef, onSubmit]);

  const handleChange = (event: FormEvent<HTMLInputElement>): void => {
    onChange(event.currentTarget.value);
  };

  const handleClick = (): void => {
    inputRef?.current?.focus();
    inputRef?.current?.setSelectionRange(
      inputRef?.current?.value?.length,
      inputRef?.current?.value?.length
    );
  };

  return (
    <div className={classes.root}>
      <input
        ref={inputRef}
        type="tel"
        value={value}
        className={cn(classes.input)}
        autoFocus
        onChange={handleChange}
        onClick={handleClick}
      />
      <span className={cn(classes.error, { [classes.hidden]: !error })}>{errorMessage}</span>
    </div>
  );
};

export default Input;
