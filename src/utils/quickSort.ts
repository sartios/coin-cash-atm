import { concat } from 'lodash';

type OrderType = 'asc' | 'desc';

export const quickSort = (originalArray: string[], order: OrderType): string[] => {
  // Clone original array to prevent it from modification
  const array = [...originalArray];

  if (array.length <= 1) {
    return array;
  }

  const leftArray = [];
  const rightArray = [];

  const pivotElement = parseInt(array.shift() as string, 10);
  const centerArray = [String(pivotElement)];

  while (array.length) {
    const currentElement = parseInt(array.shift() as string, 10);

    if (currentElement === pivotElement) {
      centerArray.push(String(currentElement));
    } else if (
      (currentElement < pivotElement && order === 'asc') ||
      (currentElement > pivotElement && order === 'desc')
    ) {
      leftArray.push(String(currentElement));
    } else {
      rightArray.push(String(currentElement));
    }
  }

  const leftArraySorted = quickSort(leftArray, order);
  const rightArraySorted = quickSort(rightArray, order);

  return concat(leftArraySorted, centerArray, rightArraySorted);
};
