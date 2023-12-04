import { readFileLineByLine } from '../../utils/readInput';

let total = 0;
const input = await readFileLineByLine('./src/day04/part1/input.txt');

input.forEach((line) => {
  const [card, numbers] = line.split(': ');
  const [winningNumbersInput, ownNumbersInput] = numbers.split(' | ');

  const winningNumbers = winningNumbersInput
    .split(' ')
    .map((number) => parseInt(number))
    .filter((input) => Number.isInteger(input));
  const ownNumbers = ownNumbersInput
    .split(' ')
    .map((number) => parseInt(number))
    .filter((input) => Number.isInteger(input));

  const includedNumbers = winningNumbers.filter((number) => ownNumbers.includes(number));
  console.log(card, includedNumbers);

  if (includedNumbers.length) {
    total += Math.pow(2, includedNumbers.length - 1);
  }

  console.log('TOTAL', total);
});

// console.log('TOTAL', total);
