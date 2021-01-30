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
  { type: 'neutral', label: 7, size: 'small' },
  { type: 'neutral', label: 8, size: 'small' },
  { type: 'neutral', label: 9, size: 'small' },
  { type: 'neutral', label: 4, size: 'small' },
  { type: 'neutral', label: 5, size: 'small' },
  { type: 'neutral', label: 6, size: 'small' },
  { type: 'neutral', label: 1, size: 'small' },
  { type: 'neutral', label: 2, size: 'small' },
  { type: 'neutral', label: 3, size: 'small' },
  { type: 'neutral', label: '.', size: 'small' },
  { type: 'neutral', label: 0, size: 'small' },
  { type: 'neutral', label: '00', size: 'small' }
];

const actions = [
  { type: 'warn', label: 'Clear', variant: 'outlined', size: 'large' },
  { type: 'danger', label: 'Cancel', variant: 'outlined', size: 'large' },
  { type: 'primary', label: 'Withdraw', variant: 'contained', size: 'large' }
];

const NumPad = () => {
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
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container>
          {actions.map((item, index) => {
            return (
              <Grid item xs={12} key={`key-${index}`} className={classes.item}>
                <Button
                  type={item.type as ButtonType}
                  label={item.label}
                  variant={item.variant as VariantType}
                  size={item.size as SizeType}
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
