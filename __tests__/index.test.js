import { test, expect } from '@jest/globals';
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

test('stylish diff for JSON files', () => {
  testFileFormat('file1a.json', 'file1b.json', 'stylish', 'file1-stylish.txt');
});

test('stylish diff for YAML files', () => {
  testFileFormat('file1a.yml', 'file1b.yml', 'stylish', 'file1-stylish.txt');
});

test('stylish diff for deep JSON structure', () => {
  testFileFormat('file2a.json', 'file2b.json', 'stylish', 'file2-stylish.txt');
});

test('plain diff for deep JSON structure', () => {
  testFileFormat('file2a.json', 'file2b.json', 'plain', 'file2-plain.txt');
});

test('JSON diff for deep JSON structure', () => {
  testFileFormat('file2a.json', 'file2b.json', 'json', 'file2-json.txt');
});

test('stylish diff for deep hex JSON', () => {
  testFileFormat('file3a.json', 'file3b.json', 'stylish', 'file3-stylish.txt');
});

test('plain diff for deep hex JSON', () => {
  testFileFormat('file3a.json', 'file3b.json', 'plain', 'file3-plain.txt');
});
