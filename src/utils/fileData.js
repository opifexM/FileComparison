import fs from 'fs';
import path from 'path';

const readFileData = (filePath) => {
  const finalPath = path.resolve(filePath);
  try {
    return fs.readFileSync(finalPath, 'utf8').trim();
  } catch (err) {
    throw new Error(`Error reading file at ${finalPath}: ${err.message}`);
  }
};

const getFileDetails = (fileName) => {
  const fileData = readFileData(fileName);
  const fileType = fileName.split('.').slice(-1)[0];
  return { fileData, fileType };
};

export {getFileDetails, readFileData};
