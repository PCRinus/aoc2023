import { readFileLineByLine } from '../../utils/readInput';

const input = await readFileLineByLine('./src/day08/part1/input.txt');

const destination = 'ZZZ';
const directions = input.splice(0, 2)[0];

const mappedInstructions = input.map((line, i) => {
  const [source, options] = line.split(' = ');
  const [leftOpt, rightOpt] = options.substring(1, options.length - 1).split(', ');

  return {
    index: i,
    source,
    leftOpt,
    rightOpt,
  };
});

let steps = 0;
let current = mappedInstructions.find((i) => i.source === 'AAA')?.source;
let index = mappedInstructions.findIndex((i) => i.source === 'AAA');

while (current !== destination) {
  console.log(`STEP ${steps}: ${current}, Index: ${index}`);
  if (current === destination) {
    break;
  }

  const instruction = mappedInstructions[index];
  console.log('INSTRUCTION: ', instruction);

  if (directions[steps % directions.length] === 'L') {
    current = instruction.leftOpt;
    steps += 1;
    index = mappedInstructions.findIndex((i) => i.source === current);

    continue;
  } else if (directions[steps % directions.length] === 'R') {
    current = instruction.rightOpt;
    steps += 1;
    index = mappedInstructions.findIndex((i) => i.source === current);

    continue;
  }
}

console.log('STEPS: ', steps);
