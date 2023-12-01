import * as fs from 'fs';
import * as fsp from "fs/promises";
import * as readline from 'readline';

export const readFile = async (path: string) => {
  try {
    const data = await fsp.readFile(path, { encoding: "utf-8" });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const readFileLineByLine = async (path: string): Promise<string[]> => {
  const lines: string[] = [];
  const fileStream = fs.createReadStream(path, { encoding: 'utf-8'});

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await(const line of rl) {
    lines.push(line)
  }

  return lines;
}
