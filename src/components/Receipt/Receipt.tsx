import React from 'react';

import { reduce, get, map, keys } from 'lodash';
import { makeStyles } from '@material-ui/core';

import { quickSort } from '../../utils';
import { Button } from '../Button';

const useStyles = makeStyles({
  title: { textAlign: 'center', fontWeight: 600, fontSize: 30 },
  subtitle: { textAlign: 'center', fontWeight: 600, fontSize: 26 },
  body: { textAlign: 'center', fontWeight: 600, fontSize: 18 },
  row: { display: 'flex', justifyContent: 'space-between' },
  btnContainer: { marginTop: 10 }
});

interface Props {
  total: string;
  cash: number[];
  hide: boolean;
  newTransaction: () => void;
}

type Dictionary = {
  [key: string]: number;
};

const operation = (acc: Dictionary, value: number): Dictionary => ({
  ...acc,
  [`${value}`]: get(acc, `${value}`, 0) + 1
});

const Receipt = ({ cash, total, hide, newTransaction }: Props) => {
  const classes = useStyles();

  if (hide) {
    return null;
  }

  const amount = reduce(cash, operation, {});
  const timestamp = new Date();

  return (
    <div>
      <div className={classes.title}>Coin Cash ATM</div>
      <div className={classes.subtitle}>Receipt</div>
      <div className={classes.row}>
        <div>Date</div>
        <div>{timestamp.toDateString()}</div>
      </div>
      <div className={classes.row}>
        <div>Time</div>
        <div>{timestamp.toLocaleTimeString('en-US')}</div>
      </div>
      <div className={classes.row}>
        <div>Total amount</div>
        <div>{total}</div>
      </div>

      <div>
        <div className={classes.body}>You received</div>
        {map(quickSort(keys(amount), 'desc'), item => {
          const col1 = `${amount[item]} ${parseInt(item, 10) >= 50 ? 'notes' : 'coins'} of`;
          const col2 = `${item} value`;

          return (
            <div key={`${item}`} className={classes.row}>
              <div>{col1}</div>
              <div>{col2}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.btnContainer}>
        <Button
          type="primary"
          label="New transaction"
          variant="outlined"
          size="full"
          onClick={newTransaction}
        />
      </div>
    </div>
  );
};

export default Receipt;
