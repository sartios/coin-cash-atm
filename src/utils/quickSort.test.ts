import { quickSort } from './quickSort';

describe('Test quick sort algorithm', () => {
  it('should sort an array for numbers in desc', () => {
    const originalArray = ['200', '5', '500', '20', '1000', '50', '2', '1000', '5', '1'];

    const expectedResult = ['1000', '1000', '500', '200', '50', '20', '5', '5', '2', '1'];
    const actualResult = quickSort(originalArray, 'desc');

    expect(actualResult).toEqual(expectedResult);
  });

  it('should sort an array for numbers in asc', () => {
    const originalArray = ['200', '5', '500', '20', '1000', '50', '2', '1000', '5', '1'];

    const expectedResult = ['1', '2', '5', '5', '20', '50', '200', '500', '1000', '1000'];
    const actualResult = quickSort(originalArray, 'asc');

    expect(actualResult).toEqual(expectedResult);
  });
});
