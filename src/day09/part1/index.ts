import { readFileLineByLine } from '../../utils/readInput';

const input = (await readFileLineByLine('./src/day09/part1/input.txt')).map((line) =>
  line.split(' ').map((n) => parseInt(n, 10))
);

const isZero = (value: number) => value === 0;
let total = 0;
const processedLines: number[][] = [];

input.forEach((line) => {
  processedLines.push(line);
  let line1 = line;
  let line2 = [];

  while (!line1.every(isZero)) {
    for (let i = 0; i < line1.length - 1; i++) {
      const diff = line1[i + 1] - line1[i];
      line2.push(diff);
    }

    processedLines.push(line2);
    line1 = line2;
    line2 = [];
  }
});

processedLines.reverse();
console.log(processedLines);

for (let i = 0; i < processedLines.length - 1; i++) {
  const member1 = processedLines[i].at(-1);
  const member2 = processedLines[i + 1].at(-1);

  processedLines[i + 1].push(member1! + member2!);
}

total += processedLines[processedLines.length - 1].at(-1)!;

console.log('TOTAL', total);
