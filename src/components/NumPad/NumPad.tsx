import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import { Button, VariantType, ButtonType, SizeType } from '../Button';

const useStyles = makeStyles({
  container: {
    maxWidth: 201
  },
  item: {
    paddingRight: 4,
    paddingBottom: 4
  }
});

// eslint-disable-next-line array-bracket-spacing
const numberArraySorted = [
  { type: 'neutral', label: 7, size: 'small', value: 7 },
  { type: 'neutral', label: 8, size: 'small', value: 8 },
  { type: 'neutral', label: 9, size: 'small', value: 9 },
  { type: 'neutral', label: 4, size: 'small', value: 4 },
  { type: 'neutral', label: 5, size: 'small', value: 5 },
  { type: 'neutral', label: 6, size: 'small', value: 6 },
  { type: 'neutral', label: 1, size: 'small', value: 1 },
  { type: 'neutral', label: 2, size: 'small', value: 2 },
  { type: 'neutral', label: 3, size: 'small', value: 3 },
  { type: 'neutral', label: '.', size: 'small', value: '.' },
  { type: 'neutral', label: 0, size: 'small', value: 0 },
  { type: 'neutral', label: '00', size: 'small', value: '00' }
];

const actionButtons = [
  {
    type: 'warn',
    label: 'Clear',
    variant: 'outlined',
    size: 'large',
    actionName: 'doClearAmount'
  },
  {
    type: 'danger',
    label: 'Cancel',
    variant: 'outlined',
    size: 'large',
    actionName: 'doCancelProcess'
  },
  {
    type: 'primary',
    label: 'Withdraw',
    variant: 'contained',
    size: 'large',
    actionName: 'doWithdrawAmount'
  }
];

type Dictionary = {
  [key: string]: () => void;
};

interface Props {
  onNumClick: (value: number | string) => void;
  actions: Dictionary;
}

const NumPad = ({ onNumClick, actions }: Props) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={7}>
        <Grid container className={classes.container}>
          {numberArraySorted.map((item, index) => {
            return (
              <Grid item xs={4} key={`key-${index}`} className={classes.item}>
                <Button
                  type={item.type as ButtonType}
                  label={item.label}
                  size={item.size as SizeType}
                  variant="contained"
                  onClick={() => onNumClick(item.value)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container>
          {actionButtons.map((item, index) => {
            return (
              <Grid item xs={12} key={`key-${index}`} className={classes.item}>
                <Button
                  type={item.type as ButtonType}
                  label={item.label}
                  variant={item.variant as VariantType}
                  size={item.size as SizeType}
                  onClick={actions[item.actionName]}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NumPad;
