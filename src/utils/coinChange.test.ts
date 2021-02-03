import { coinChange, initialSupply } from './coinChange';

describe('Test algorithm for calculating amount denominators', () => {
  it('should return the least amount of denominators', () => {
    const amount = 1888;
    const expectedResult = {
      result: [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1],
      newSupply: [
        [1000, 99],
        [500, 99],
        [200, 99],
        [100, 99],
        [50, 99],
        [20, 99],
        [10, 99],
        [5, 99],
        [2, 99],
        [1, 99]
      ]
    };
    const actualResult = coinChange(amount, initialSupply, []);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should pass paper example', () => {
    const amount = 578;
    const expectedResult = {
      result: [500, 50, 20, 5, 2, 1],
      newSupply: [
        [1000, 100],
        [500, 99],
        [200, 100],
        [100, 100],
        [50, 99],
        [20, 99],
        [10, 100],
        [5, 99],
        [2, 99],
        [1, 99]
      ]
    };
    const actualResult = coinChange(amount, initialSupply, []);

    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the least denominators when insufficient supply', () => {
    const amount = 578;
    const insufficientSupply = [
      [1000, 0],
      [500, 0],
      [200, 0],
      [100, 0],
      [50, 0],
      [20, 0],
      [10, 0],
      [5, 5],
      [2, 2],
      [1, 1]
    ];

    const expectedResult = {
      result: [5, 5, 5, 5, 5, 2, 2, 1],
      newSupply: [
        [1000, 0],
        [500, 0],
        [200, 0],
        [100, 0],
        [50, 0],
        [20, 0],
        [10, 0],
        [5, 0],
        [2, 0],
        [1, 0]
      ]
    };
    const actualResult = coinChange(amount, insufficientSupply, []);

    expect(actualResult).toEqual(expectedResult);
  });
});
