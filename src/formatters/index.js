import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJson from './json.js';

const getDiffReport = (data1, data2, format, diffData) => {
  if (format === 'stylish') {
    return formatToStylish(data1, data2, diffData).trim();
  }
  if (format === 'plain') {
    return formatToPlain(data1, data2, diffData).trim();
  }
  if (format === 'json') {
    return formatToJson(data2);
  }
  return 'Error format.';
};
export default getDiffReport;
