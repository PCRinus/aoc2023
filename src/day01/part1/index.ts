import { readFileLineByLine } from '../../utils/readInput';

const getCalibrationValue = (line: string): string => {
  let param1 = '';
  let param2 = '';
  for (let i = 0; i <= line.length; i++) {
    if (param1 && param2) break;
    if (param1 === '' && Number.isInteger(parseInt(line[i]))) {
      param1 = line[i];
    }

    if (param2 === '' && Number.isInteger(parseInt(line[line.length - i]))) {
      param2 = line[line.length - i];
    }
  }

  console.log(param1 + param2);

  return param1 + param2;
};

const getTotalValue = (values: string[]) => {
  const total = values.reduce((acc, curr) => {
    return acc + +curr;
  }, 0);

  return total;
};

const input = await readFileLineByLine('./src/day01/part1/input.txt');
const values: string[] = [];

input.forEach((line) => {
  const calibrationValue = getCalibrationValue(line);
  values.push(calibrationValue);
});

console.log('VALUES', values);

const total = getTotalValue(values);

console.log('TOTAL', total);
