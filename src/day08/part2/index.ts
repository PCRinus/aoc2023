import { readFileLineByLine } from '../../utils/readInput';

const input = await readFileLineByLine('./src/day08/part2/input.txt');

const directions = input.splice(0, 2)[0];

const lcm = (...arr: number[]) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

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

const startsThatEndInA = mappedInstructions.filter((line) => line.source.endsWith('A'));

console.log('STARTS THAT END IN A: ', startsThatEndInA);

const stepLengths = Array(startsThatEndInA.length).fill(0);

for (let i = 0; i < startsThatEndInA.length; i++) {
  console.log('STARTING AT: ', i);
  let steps = 0;
  let current = startsThatEndInA[i].source;
  let index = startsThatEndInA[i].index;

  while (!current.endsWith('Z')) {
    console.log(`STEP ${steps}: ${current}, Index: ${index}`);

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

  stepLengths[i] = steps;
}

console.log('STEPS: ', stepLengths);

const result = lcm(...stepLengths);

console.log('RESULT: ', result);
