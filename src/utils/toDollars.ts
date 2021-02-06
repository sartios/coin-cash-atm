export const toDollars = (amount: number | string): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(typeof amount === 'number' ? amount : parseInt(amount, 10));
