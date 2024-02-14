import { test, expect, describe } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import startGeneration from '../src/index.js';
import readFile from '../src/utils/readFile.js';

function testFileFormat(fileA, fileB, format, expectedResultFile) {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const fixturesDir = path.resolve(currentDir, '..', '__fixtures__');

  const file1 = path.join(fixturesDir, fileA);
  const file2 = path.join(fixturesDir, fileB);
  const fileResult = path.join(fixturesDir, expectedResultFile);

  const actualResult = startGeneration(file1, file2, format);
  const expectedResult = readFile(fileResult);
  expect(actualResult).toEqual(expectedResult);
}

const casesByFormatter = {
  stylish: [
    ['file1a.json', 'file1b.json', 'file1-stylish.txt'],
    ['file1a.yml', 'file1b.yml', 'file1-stylish.txt'],
    ['file2a.json', 'file2b.json', 'file2-stylish.txt'],
    ['file3a.json', 'file3b.json', 'file3-stylish.txt'],
  ],
  plain: [
    ['file2a.json', 'file2b.json', 'file2-plain.txt'],
    ['file3a.json', 'file3b.json', 'file3-plain.txt'],
  ],
  json: [
    ['file2a.json', 'file2b.json', 'file2-json.txt'],
  ],
};

describe.each(['stylish', 'plain', 'json'])('Testing format %s', (formatter) => {
  const cases = casesByFormatter[formatter];

  test.each(cases)(
    `Testing files '%s' and '%s' with format '${formatter}'`,
    (fileA, fileB, expectedResultFile) => {
      testFileFormat(fileA, fileB, formatter, expectedResultFile);
    },
  );
});
