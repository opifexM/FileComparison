import readFileData from './fileReader.js';
import getDiffData from './parsers.js';
import getDiffReport from './formatters/index.js';

const startGeneration = (file1, file2, format = 'stylish') => {
  const data1 = readFileData(file1);
  const data2 = readFileData(file2);
  const diffData = getDiffData(data1, data2);
  const diffReport = getDiffReport(data1, data2, format, diffData);
  return diffReport;
};

export default startGeneration;
