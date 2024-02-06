import readFileData from './fileReader.js';
import generateDiffMap from './parsers.js';
import getDiffReport from './formatters/index.js';

const startGeneration = (file1, file2, format = 'stylish') => {
  const data1 = readFileData(file1);
  const data2 = readFileData(file2);
  const diffData = generateDiffMap(data1, data2);
  return getDiffReport(data1, data2, format, diffData);
};

export default startGeneration;
