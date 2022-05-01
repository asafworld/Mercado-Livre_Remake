export default function priceFormat(number, sign = 'R$') {
  if (number !== undefined) {
    const decimalNumber = number.toFixed(2);
    const numberFormat = decimalNumber.replace('.', ',');
    return `${sign} ${numberFormat}`;
  }
}
