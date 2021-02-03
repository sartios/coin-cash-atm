// import { reduce } from 'lodash';

export const initialSupply = [
  [1000, 100],
  [500, 100],
  [200, 100],
  [100, 100],
  [50, 100],
  [20, 100],
  [10, 100],
  [5, 100],
  [2, 100],
  [1, 100]
];

// const calcAvailability = (supply: number[][]): number => reduce(supply, (acc, coin) => acc + coin[0] * coin[1], 0 );

const coinChange = (
  amount: number,
  supply: number[][],
  result: number[]
): { result: number[]; newSupply: number[][] } => {
  // if(calcAvailability(supply) < amount) {
  //   return { result: [], newSupply: supply };
  // }

  const currentSupply = [...supply];
  const currentResult = [...result];

  for (let index = 0; index < currentSupply.length; index += 1) {
    const coin = currentSupply[index];
    const value = coin[0];
    const availability = coin[1];

    if (amount >= value && availability > 0) {
      const newAmount = amount - value;

      const newAvailability = availability - 1;
      currentSupply.splice(index, 1, [value, newAvailability]);
      currentResult.push(value);

      return coinChange(newAmount, currentSupply, currentResult);
    }
  }

  return { result: currentResult, newSupply: currentSupply };
};

export default coinChange;
