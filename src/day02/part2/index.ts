import { readFileLineByLine } from '../../utils/readInput';

const input = await readFileLineByLine('./src/day02/part2/input.txt');
let total = 0;

input.forEach((line) => {
  const [gameIdInfo, gameInfo] = line.split(': ');
  console.log(gameIdInfo);

  const maxes = {
    green: 0,
    red: 0,
    blue: 0,
  };

  const hands = gameInfo.split('; ');
  hands.forEach((hand) => {
    const cubes = hand.split(', ');
    cubes.forEach((cube) => {
      const [count, color] = cube.split(' ');
      // @ts-ignore
      if (parseInt(count) > maxes[color]) {
        // @ts-ignore
        maxes[color] = parseInt(count);
      }
    });
  });

  const power = maxes.blue * maxes.green * maxes.red;
  console.log('POWER', power);
  total += power;

  maxes.blue = 0;
  maxes.green = 0;
  maxes.red = 0;
});

console.log('TOTAL', total);
