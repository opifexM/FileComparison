import _ from 'lodash';
import parseFile from './parsers.js';

const startGeneration = (file1, file2, format) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const uniqueKeys = getUniqueKeys(data1, data2);
  const report = getDiffReport(data1, data2, uniqueKeys, format);
  return report;
};



const getUniqueKeys = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)];
  const uniqueKeys = Array.from(new Set(keys));
  return uniqueKeys.sort((a, b) => a.localeCompare(b));
};

const addRecordStylish = (key, hasInData1, value1, hasInData2, value2, isSameValues) => {
  if (hasInData1 && hasInData2 && isSameValues) {
    return `    ${key}: ${value1}\n`;
  }
  if (hasInData1 && hasInData2 && !isSameValues) {
    return `  - ${key}: ${value1}\n  + ${key}: ${value2}\n`;
  }
  if (hasInData1 && !hasInData2) {
    return `  - ${key}: ${value1}\n`;
  }
  if (!hasInData1 && hasInData2) {
    return `  + ${key}: ${value2}\n`;
  }
  return '';
};

const addFormatStylish = (report) => `{\n${report}}`;

const getDiffReport = (data1, data2, uniqueKeys, format) => {
  let report = '';
  for (const key of uniqueKeys) {
    const hasInData1 = Object.hasOwn(data1, key);
    const hasInData2 = Object.hasOwn(data2, key);
    const value1 = hasInData1 ? data1[key] : '';
    const value2 = hasInData2 ? data2[key] : '';
    const isSameValues = (hasInData1 && hasInData2) ? _.isEqual(value1, value2) : false;
    report += addRecordStylish(key, hasInData1, value1, hasInData2, value2, isSameValues);
  }
  const formattedReport = addFormatStylish(report);
  return formattedReport;
};

export default startGeneration;
