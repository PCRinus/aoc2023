import { readFileLineByLine } from '../../utils/readInput';

type CubeConfig = {
  red: number;
  green: number;
  blue: number;
};

const MAX: CubeConfig = {
  red: 12,
  green: 13,
  blue: 14,
};

const getGameId = (gameId: string): number => {
  return parseInt(gameId.split(' ')[1]);
};

const isGamePossible = (gameInfo: string): boolean => {
  const hands = gameInfo.split('; ');
  const isPossible = hands.every((hand) => {
    if (!isHandPossible(hand)) {
      console.log('IMPOSSIBLE');
      return false;
    }

    console.log('POSSIBLE');
    return true;
  });

  return isPossible;
};

const isHandPossible = (hand: string): boolean => {
  const cubes = hand.split(', ');
  const isPossible = cubes.every((cube) => {
    const [count, color] = cube.split(' ');
    const countInt = parseInt(count);

    // @ts-ignore
    if (countInt > MAX[color]) {
      return false;
    }

    return true;
  });

  return isPossible;
};

const input = await readFileLineByLine('./src/day02/part1/input.txt');
let total = 0;

input.forEach((line) => {
  const [gameIdInfo, gameInfo] = line.split(': ');
  console.log(gameIdInfo);

  if (!isGamePossible(gameInfo)) {
    return;
  }

  const id = getGameId(gameIdInfo);
  total += id;
});

console.log('TOTAL', total);
