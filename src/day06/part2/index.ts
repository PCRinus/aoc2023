import { readFileLineByLine } from '../../utils/readInput';

const input = await readFileLineByLine('./src/day06/part2/input.txt');
const time = parseInt(
  input[0]
    .split(':')[1]
    .trimStart()
    .split(' ')
    .map((e) => parseInt(e))
    .filter((e) => Number.isInteger(e))
    .join('')
);

const distanceToBeat = parseInt(
  input[1]
    .split(':')[1]
    .trimStart()
    .split(' ')
    .map((e) => parseInt(e))
    .filter((e) => Number.isInteger(e))
    .join('')
);

console.log('TIME', time);
console.log('DISTANCE', distanceToBeat);

let total = 0;

for (let i = 0; i < time; i++) {
  if (i * (time - i) > distanceToBeat) {
    total++;
  }
}

console.log('TOTAL', total);
