import { readFileLineByLine } from '../../utils/readInput';

const input = (await readFileLineByLine('./src/day09/part2/input.txt')).map((line) =>
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

for (let i = 0; i < processedLines.length - 1; i++) {
  const member1 = processedLines[i].at(0);
  const member2 = processedLines[i + 1].at(0);

  if (!processedLines[i + 1].every(isZero)) {
    processedLines[i + 1].unshift(member2! - member1!);
  } else if (processedLines[i + 1].every(isZero)) {
    console.log('HERE is 0', processedLines[i]);

    total += processedLines[i].at(0)!;
  }
}

console.log(processedLines);

total += processedLines[processedLines.length - 1].at(0)!;

console.log('TOTAL', total);
