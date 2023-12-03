import { readFileLineByLine } from '../../utils/readInput';

let total = 0;
const numberRegex = /\d+/g;
const symbolRegex = /\*/g;
const input = await readFileLineByLine('./src/day03/part2/input.txt');

const matchedNumbers: { value: number; line: number; cols: { start: number; end: number } }[] = [];
const matchedSymbols: { value: string; line: number; cols: number }[] = [];

const matchNumbersWithCoords = (line: string, index: number) => {
  const matches = [...line.matchAll(numberRegex)];

  matches.forEach((match) => {
    if (match.index === undefined) {
      return;
    }

    const start = match.index;
    const end = match.index + match[0].length - 1;

    matchedNumbers.push({
      value: parseInt(match[0]),
      line: index,
      cols: { start, end },
    });
  });
};

const matchSymbolsWithCoords = (line: string, index: number) => {
  const matches = [...line.matchAll(symbolRegex)];

  matches.forEach((match) => {
    if (match.index === undefined) {
      return;
    }

    matchedSymbols.push({
      value: match[0],
      line: index,
      cols: match.index,
    });
  });
};

input.forEach((line, index) => {
  matchNumbersWithCoords(line, index);
  matchSymbolsWithCoords(line, index);
});

console.log(matchedNumbers);
console.log('------------------');
console.log(matchedSymbols);

const checkIfSymbolIsAdjacentToTwoNumbers = () => {
  matchedSymbols.forEach((symbol) => {
    let adjacencies = 0;
    const values: number[] = [];

    matchedNumbers.forEach((number) => {
      if (symbol.line === number.line || symbol.line === number.line + 1 || symbol.line === number.line - 1) {
        const arr = Array.from({ length: number.cols.end - number.cols.start + 1 }, (_, i) => i + number.cols.start);
        arr.unshift(number.cols.start - 1);
        arr.push(number.cols.end + 1);

        if (arr.includes(symbol.cols)) {
          adjacencies++;
          values.push(number.value);
        }
      }
    });

    if (adjacencies === 2) {
      total += values[0] * values[1];
    }
  });
};

checkIfSymbolIsAdjacentToTwoNumbers();

console.log('TOTAL', total);
