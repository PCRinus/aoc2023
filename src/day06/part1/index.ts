import { readFileLineByLine } from '../../utils/readInput';

const input = await readFileLineByLine('./src/day06/part1/input.txt');
const times = input[0]
  .split(':')[1]
  .trimStart()
  .split(' ')
  .map((e) => parseInt(e))
  .filter((e) => Number.isInteger(e));

const distancesToBeat = input[1]
  .split(':')[1]
  .trimStart()
  .split(' ')
  .map((e) => parseInt(e))
  .filter((e) => Number.isInteger(e));

console.log(times);
console.log(distancesToBeat);

const total = Array(times.length).fill(0);

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = distancesToBeat[i];

  for (let j = 1; j < time; j++) {
    if (j * (time - j) > distance) {
      total[i] += 1;
    }
  }
}

const final = total.reduce((acc, curr) => {
  return acc * curr;
}, 1);

console.log('FINAL', final);
