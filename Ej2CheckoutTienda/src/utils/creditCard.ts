export const validateLuhn = (num: string): boolean => {
  let arr = (num + '').split('').reverse().map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2 % 9) || (val * 2 === 0 ? 0 : 9))), 0);
  return (sum + lastDigit) % 10 === 0;
};

export const getCardType = (num: string): string => {
  if (/^4/.test(num)) return 'Visa';
  if (/^5[1-5]/.test(num)) return 'Mastercard';
  if (/^3[47]/.test(num)) return 'Amex';
  return 'Unknown';
};