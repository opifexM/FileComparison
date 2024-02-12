import readFile from './utils/readFile.js';
import parseJson from './utils/parseJson.js';
import parseYaml from './utils/parseYaml.js';

const parseFileData = (fileData, fileType) => {
  if (fileType === 'json') {
    return parseJson(fileData);
  }
  if (fileType === 'yml' || fileType === 'yaml') {
    return parseYaml(fileData);
  }
  throw new Error(`Incorrect file format for parse '${fileType}'`);
};

const readFileData = (fileName) => {
  const fileData = readFile(fileName);
  const fileType = fileName.split('.').slice(-1)[0];
  return parseFileData(fileData, fileType);
};

export default readFileData;
