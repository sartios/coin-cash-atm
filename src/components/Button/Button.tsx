import React from 'react';
import cn from 'classnames';

import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  small: {
    width: 63,
    height: 63,
    borderRadius: 14
  },
  neutral: {
    backgroundColor: '#747474',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#969BA0'
    }
  }
});

interface Props {
  label: string;
  variant?: 'text' | 'outlined' | 'contained';
}

const ButtonWrapper = ({ label, variant = 'contained' }: Props) => {
  const classes = useStyles();

  return (
    <Button classes={{ root: cn(classes.small, classes.neutral) }} variant={variant}>
      {label}
    </Button>
  );
};

export default ButtonWrapper;
