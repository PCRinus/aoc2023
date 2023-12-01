import * as fs from 'fs';
import * as fsp from 'fs/promises';

export const writeOutputSync = (content: string) => {
  try {
    fs.writeFileSync('./output.txt', `${content}\n`, { flag: 'a+' });
  } catch (error) {
    console.log(error);
  }
};

export const writeOutputAsync = async (path: string, content: string) => {
  try {
    await fsp.writeFile(path, `${content}\n`, { flag: 'a+' });
  } catch (error) {
    console.log(error);
  }
};
