import parseJson from './parseJson.js';
import parseYaml from './parseYaml.js';

const parseFileData = (fileData, fileType) => {
  switch (fileType) {
    case 'json':
      return parseJson(fileData);
    case 'yml':
    case 'yaml':
      return parseYaml(fileData);
    default:
      throw new Error(`Incorrect file format for parse '${fileType}'`);
  }
};

export default parseFileData;
