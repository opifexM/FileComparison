import readFile from './readFile.js';

const readFileData = (fileName) => {
  const fileData = readFile(fileName);
  const fileType = fileName.split('.').slice(-1)[0];
  return { fileData, fileType };
};

export default readFileData;
