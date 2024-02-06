import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJson from './json.js';

const getDiffReport = (data1, data2, format, diffData) => {
  switch (format) {
    case 'stylish':
      return formatToStylish(data1, data2, diffData).trim();
    case 'plain':
      return formatToPlain(data1, data2, diffData).trim();
    case 'json':
      return formatToJson(data2);
    default:
      throw new Error(`Error format ${format}.`);
  }
};
export default getDiffReport;
