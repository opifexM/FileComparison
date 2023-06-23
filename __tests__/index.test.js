import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import startGeneration from '../src/index.js';
import readFile from '../src/utils/readFile.js';

test('json stylish format', () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const fixturesDir = path.join(currentDir, '__fixtures__');
  const file1 = path.join(fixturesDir, 'file1.json');
  const file2 = path.join(fixturesDir, 'file2.json');
  const fileResult = path.join(fixturesDir, 'file1-2-stylish.txt');

  const actualResult = startGeneration(file1, file2);
  const expectedResult = readFile(fileResult);
  expect(actualResult).toEqual(expectedResult);
});

test('yaml stylish format', () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const fixturesDir = path.join(currentDir, '__fixtures__');
  const file1 = path.join(fixturesDir, 'file1.yml');
  const file2 = path.join(fixturesDir, 'file2.json');
  const fileResult = path.join(fixturesDir, 'file1-2-stylish.txt');

  const actualResult = startGeneration(file1, file2);
  const expectedResult = readFile(fileResult);
  expect(actualResult).toEqual(expectedResult);
});
