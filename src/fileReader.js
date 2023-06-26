import readFile from './utils/readFile.js';
import parseJson from './utils/parseJson.js';
import parseYaml from './utils/parseYaml.js';

const readFileData = (fileName) => {
  const fileData = readFile(fileName);
  if (fileName.endsWith('.json')) {
    return parseJson(fileData);
  }
  if (fileName.endsWith('.yml') || fileName.endsWith('.yaml')) {
    return parseYaml(fileData);
  }
  return '';
};
export default readFileData;
