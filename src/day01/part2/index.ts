import { readFileLineByLine } from '../../utils/readInput';

const VALID_NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] as const;

const mapStringToNumber = (value: (typeof VALID_NUMBERS)[number]) => {
  switch (value) {
    case 'one':
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    default:
      return 'This should not be reachable';
  }
};

const getAvailableValuesWithIndexes = (line: string): { value: string; index: string }[] => {
  const records: { value: string; index: string }[] = [];

  VALID_NUMBERS.forEach((nbr) => {
    [...line.matchAll(new RegExp(nbr, 'gi'))].forEach((a) => {
      if (a.index !== undefined) {
        const obj = {
          value: mapStringToNumber(nbr),
          index: String(a.index),
        };

        records.push(obj);
      }
    });
  });

  return records;
};

const getAvailableNumbersWithIndexes = (line: string): { value: string; index: string }[] => {
  const records: { value: string; index: string }[] = [];

  for (let i = 0; i <= line.length; i++) {
    if (Number.isInteger(parseInt(line[i]))) {
      records.push({
        value: line[i],
        index: String(i),
      });
    }
  }

  return records;
};

const getTotalValue = (values: string[]) => {
  const total = values.reduce((acc, curr) => {
    return acc + +curr;
  }, 0);

  return total;
};

const input = await readFileLineByLine('./src/day01/part2/input.txt');
const values: string[] = [];

input.forEach((line) => {
  console.log('Line', line);
  const valueMap = getAvailableValuesWithIndexes(line);
  const numberMap = getAvailableNumbersWithIndexes(line);

  const mergeMap = valueMap.concat(numberMap).sort((a, b) => {
    const index1 = parseInt(a.index);
    const index2 = parseInt(b.index);

    return index1 - index2;
  });

  const firstKeyInMap = mergeMap[0].value;
  const lastKeyInMap = mergeMap[mergeMap.length - 1].value;
  const coordinate = firstKeyInMap + lastKeyInMap;

  console.log('Coordinate', coordinate);
  values.push(coordinate);

  console.log('--------------------------------');
});

const total = getTotalValue(values);

console.log('TOTAL', total);
