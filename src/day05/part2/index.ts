import { readFileLineByLine } from '../../utils/readInput';

const input = await readFileLineByLine('./src/day05/part2/input.txt');

const seedsList = input[0].split(': ')[1];
const seedsRange = seedsList.split(' ').map((seed) => parseInt(seed));
const seeds: { start: number; end: number }[] = [];

for (let i = 0; i < seedsRange.length; i += 2) {
  seeds.push({ start: seedsRange[i], end: seedsRange[i] + seedsRange[i + 1] });
}

console.log('SEEDS', seeds);

//Process the array a bit
input.splice(0, 2);
input.push('');

const mappers: { label: string; mapping: string[] }[] = [];

while (input.length !== 0) {
  const [label, ...mapping] = input.splice(0, input.indexOf('') + 1);
  mapping.pop();
  mappers.push({ label, mapping });
}

const finalDestinations: { start: number; end: number }[] = [];

while (seeds.length !== 0) {
  const { start, end } = seeds.splice(0, 1)[0];
  console.log('SEED', start, end);

  mappers.forEach((mapper) => {
    const { label, mapping } = mapper;

    console.log(label.split(' ')[0].split('-')[2].toUpperCase());

    mapping.every((map) => {
      const [destination, source, length] = map.split(' ').map((value) => parseInt(value));
      console.log('LALALA', destination, source, length);
      const startOverlap = Math.max(start, source);
      const endOverlap = Math.min(end, source + length);
      console.log('OVERLAP', startOverlap, endOverlap)

      if (startOverlap < endOverlap) {
        finalDestinations.push({ start: startOverlap - source + destination, end: endOverlap - source + destination });

        if (startOverlap > start) {
          seeds.push({ start, end: startOverlap });
        }

        if (endOverlap < end) {
          seeds.push({ start: endOverlap, end });
        }
        return false;
      } else {
        return true;
      }
    });
  });
}

console.log('DESTINATIONS', finalDestinations);

// const minimum = Math.min(...finalDestinations);

// console.log('MINIMUM', minimum);
