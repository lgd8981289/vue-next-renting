/**
 * 为数字加万
 * 12000 -> 1.20 万
 * 9800 -> 0.98 万
 * @param {} number
 */
export default function (number) {
  number = parseFloat(number);
  if (typeof number !== 'number') return '0.00';
  if (number < 1000) return number;
  return (number / 10000).toFixed(2) + '万';
}
