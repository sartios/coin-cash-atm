import React from 'react';
import cn from 'classnames';

import { Button, makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  small: {
    width: 63,
    height: 63,
    borderRadius: 14
  },
  large: {
    width: 122,
    height: 53,
    borderRadius: 14,
    textTransform: 'none'
  },
  neutral: ({ variant }) => {
    if (variant === 'contained') {
      return {
        backgroundColor: '#747474',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#969BA0'
        }
      };
    } else if (variant === 'outlined') {
      return {
        border: '2px solid #9C9C9C',
        backgroundColor: 'transparent',
        color: '#9C9C9C',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      };
    }

    return {};
  },
  primary: ({ variant }) => {
    if (variant === 'contained') {
      return {
        backgroundColor: '#71B945',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#969BA0'
        }
      };
    } else if (variant === 'outlined') {
      return {
        border: '2px solid #71B945',
        backgroundColor: 'transparent',
        color: '#71B945',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      };
    }

    return {};
  },
  danger: ({ variant }) => {
    if (variant === 'contained') {
      return {
        backgroundColor: '#FF5757',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#969BA0'
        }
      };
    } else if (variant === 'outlined') {
      return {
        border: '2px solid #FF5757',
        backgroundColor: 'transparent',
        color: '#FF5757',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      };
    }

    return {};
  },
  warn: ({ variant }) => {
    if (variant === 'contained') {
      return {
        backgroundColor: '#FF782C',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#969BA0'
        }
      };
    } else if (variant === 'outlined') {
      return {
        border: '2px solid #FF782C',
        backgroundColor: 'transparent',
        color: '#FF782C',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      };
    }

    return {};
  }
}));

export type VariantType = 'outlined' | 'contained';
export type ButtonType = 'neutral' | 'primary' | 'danger' | 'warn';
export type SizeType = 'small' | 'large';

export interface ButtonProps {
  label: string | number;
  variant: VariantType;
  type: ButtonType;
  size: SizeType;
  onClick: () => void;
}

export interface StyleProps {
  variant: VariantType;
}

const ButtonWrapper = ({ label, variant, type, size, onClick }: ButtonProps) => {
  const classes = useStyles({ variant });

  return (
    <Button
      classes={{
        root: cn(
          { [classes[size]]: classes[size] !== undefined },
          { [classes[type]]: classes[type] !== undefined }
        )
      }}
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default ButtonWrapper;
