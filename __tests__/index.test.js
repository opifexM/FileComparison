import { startGeneration } from '../src/index.js';
import { readFile } from '../src/utils/readFile.js';
import { test, expect } from '@jest/globals';

test('startGeneration', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const fileResult = 'file1-2-stylish.txt';
  const actualResult = startGeneration('__fixtures__/' + file1, '__fixtures__/' + file2);
  const expectedResult = readFile('__fixtures__/' + fileResult);
  console.log(`|${actualResult}|`);
  console.log(`|${expectedResult}|`);
  expect(actualResult).toEqual(expectedResult);
});
