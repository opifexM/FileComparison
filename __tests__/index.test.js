import { test, expect, describe } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import startGeneration from '../src/index.js';
import readFile from '../src/utils/readFile.js';

function testFileFormat(inputFileName, fileFormat) {
  const fixturesPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__');
  const file1 = path.join(fixturesPath, `${inputFileName}-a.json`);
  const file2 = path.join(fixturesPath, `${inputFileName}-b.json`);
  const expectedResultFile = path.join(fixturesPath, `${inputFileName}-${fileFormat}.txt`);

  const actualResult = startGeneration(file1, file2, fileFormat);
  const expectedResult = readFile(expectedResultFile);
  expect(actualResult).toEqual(expectedResult);
}

const fileFormatsMap = {
  stylish: [
    ['file1', 'json'],
    ['file1', 'yml'],
    ['file2', 'json'],
    ['file3', 'json'],
  ],
  plain: [
    ['file2', 'json'],
    ['file3', 'json'],
  ],
  json: [
    ['file2', 'json'],
  ],
};

describe.each(Object.entries(fileFormatsMap))(
  'Testing format %s',
  (fileFormat, inputFileName) => {
    test.each(inputFileName)(
      `Testing files with base name '%s' and format '${fileFormat}'`,
      (baseName) => testFileFormat(baseName, fileFormat),
    );
  },
);
