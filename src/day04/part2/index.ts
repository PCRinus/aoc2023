import { readFileLineByLine } from '../../utils/readInput';

const input = await readFileLineByLine('./src/day04/part2/input.txt');
let totalCards = Array(input.length).fill(1);

input.forEach((line, index) => {
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

  includedNumbers.forEach((_, i) => {
    totalCards[index + i + 1] += totalCards[index];
  });

  console.log('TOTAL_CARDS', totalCards);
});

const total = totalCards.reduce((acc, curr) => acc + curr, 0);

console.log('TOTAL', total);
