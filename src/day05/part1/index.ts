import { readFileLineByLine } from '../../utils/readInput';

type Mapper = {
  type: '';
  values: {
    destinationRange: number;
    sourceRange: number;
    rangeLength: number;
  }[];
};

const input = await readFileLineByLine('./src/day05/part1/input.txt');

const seedsList = input[0].split(': ')[1];
const seeds = seedsList.split(' ').map((seed) => parseInt(seed));

//Process the array a bit
input.splice(0, 2);
input.push('');

const mappers: { label: string; mapping: string[] }[] = [];

while (input.length !== 0) {
  const [label, ...mapping] = input.splice(0, input.indexOf('') + 1);
  mapping.pop();
  mappers.push({ label, mapping });
}

const finalDestinations: Array<number> = [];

seeds.forEach((seed) => {
  let mappedDestination = seed;

  console.log('SEED', mappedDestination);

  mappers.forEach((mapper) => {
    const { label, mapping } = mapper;

    console.log(label.split(' ')[0].split('-')[2].toUpperCase());

    mapping.every((map) => {
      const [destination, source, length] = map.split(' ').map((value) => parseInt(value));
      console.log(destination, source, length)

      if (source <= mappedDestination && mappedDestination < source + length) {
        mappedDestination = mappedDestination - source + destination;

        console.log('MAPPED', mappedDestination);

        return false;
      } else {
        console.log('NOT MAPPED', mappedDestination);
        return true;
      }
    });
  });

  finalDestinations.push(mappedDestination);
});

console.log('DESTINATIONS', finalDestinations);

const minimum = Math.min(...finalDestinations);

console.log('MINIMUM', minimum);
