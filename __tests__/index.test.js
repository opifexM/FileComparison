import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import startGeneration from '../src/index.js';
import readFile from '../src/utils/readFile.js';

test('file json stylish-format', () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const fixturesDir = path.join(currentDir, '__fixtures__');
  const file1 = path.join(fixturesDir, 'file1a.json');
  const file2 = path.join(fixturesDir, 'file1b.json');
  const fileResult = path.join(fixturesDir, 'file1-stylish.txt');

  const actualResult = startGeneration(file1, file2, 'stylish');
  const expectedResult = readFile(fileResult);
  expect(actualResult).toEqual(expectedResult);
});

test('file yaml stylish-format', () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const fixturesDir = path.join(currentDir, '__fixtures__');
  const file1 = path.join(fixturesDir, 'file1a.yml');
  const file2 = path.join(fixturesDir, 'file1b.yml');
  const fileResult = path.join(fixturesDir, 'file1-stylish.txt');

  const actualResult = startGeneration(file1, file2, 'stylish');
  const expectedResult = readFile(fileResult);
  expect(actualResult).toEqual(expectedResult);
});

test('file json deep stylish-format', () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const fixturesDir = path.join(currentDir, '__fixtures__');
  const file1 = path.join(fixturesDir, 'file2a.json');
  const file2 = path.join(fixturesDir, 'file2b.json');
  const fileResult = path.join(fixturesDir, 'file2-stylish.txt');

  const actualResult = startGeneration(file1, file2, 'stylish');
  const expectedResult = readFile(fileResult);
  expect(actualResult).toEqual(expectedResult);
});

test('file json deep plain-format', () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const fixturesDir = path.join(currentDir, '__fixtures__');
  const file1 = path.join(fixturesDir, 'file2a.json');
  const file2 = path.join(fixturesDir, 'file2b.json');
  const fileResult = path.join(fixturesDir, 'file2-plain.txt');

  const actualResult = startGeneration(file1, file2, 'plain');
  const expectedResult = readFile(fileResult);
  expect(actualResult).toEqual(expectedResult);
});

test('file json deep json-format', () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const fixturesDir = path.join(currentDir, '__fixtures__');
  const file1 = path.join(fixturesDir, 'file2a.json');
  const file2 = path.join(fixturesDir, 'file2b.json');
  const fileResult = path.join(fixturesDir, 'file2-json.txt');

  const actualResult = startGeneration(file1, file2, 'json');
  const expectedResult = readFile(fileResult);
  expect(actualResult).toEqual(expectedResult);
});
