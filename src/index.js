import parseFileData from './parsers/parseFileData.js';
import readFileData from './utils/readFileData.js';
import generateDiffMap from './dataComparer.js';
import getDiffReport from './formatters/index.js';

const startGeneration = (file1, file2, format = 'stylish') => {
  const { fileData: fileData1, fileType: fileType1 } = readFileData(file1);
  const { fileData: fileData2, fileType: fileType2 } = readFileData(file2);
  const parsedFileData1 = parseFileData(fileData1, fileType1);
  const parsedFileData2 = parseFileData(fileData2, fileType2);

  const diffData = generateDiffMap(parsedFileData1, parsedFileData2);
  return getDiffReport(parsedFileData1, parsedFileData2, format, diffData);
};

export default startGeneration;
