import _ from 'lodash';

const addStartEndStylish = (diffReport) => `{\n${diffReport}}`;

const getFormatObject = (obj, spaceNumber) => {
  if (!_.isObject(obj)) {
    return `${obj}\n`;
  }

  const space1 = ' '.repeat(spaceNumber);
  let diffReport = '';
  diffReport += '{\n';
  spaceNumber += 4;
  for (const [key, value] of Object.entries(obj)) {
    const space2 = ' '.repeat(spaceNumber);
    if (_.isObject(value)) {
      diffReport += `${space2}    ${key}: ${getFormatObject(value, spaceNumber)}`;
    } else {
      diffReport += `${space2}    ${key}: ${value}\n`;
    }
  }
  diffReport += `${space1}    }\n`;
  return diffReport;
};

const addLineStylish = (data1, data2, diffData, spaceNumber = 0) => {
  let diffReport = '';
  const space = ' '.repeat(spaceNumber);
  diffData.forEach((diffValue, diffKey) => {
    const value1 = Object.hasOwn(data1, diffKey)
      ? data1[diffKey]
      : 'ERROR';
    const value2 = Object.hasOwn(data2, diffKey)
      ? data2[diffKey]
      : 'ERROR';

    if (diffValue === 'deleted') {
      diffReport += `${space}  - ${diffKey}: ${getFormatObject(value1, spaceNumber)}`;
    } else if (diffValue === 'added') {
      diffReport += `${space}  + ${diffKey}: ${getFormatObject(value2, spaceNumber)}`;
    } else if (diffValue === 'unchanged') {
      diffReport += `${space}    ${diffKey}: ${getFormatObject(value1, spaceNumber)}`;
    } else if (diffValue === 'changed') {
      diffReport += `${space}  - ${diffKey}: ${getFormatObject(value1, spaceNumber)}`;
      diffReport += `${space}  + ${diffKey}: ${getFormatObject(value2, spaceNumber)}`;
    } else {
      diffReport += `${space}    ${diffKey}: {\n`;
      diffReport += addLineStylish(value1, value2, diffValue, spaceNumber + 4);
      diffReport += `${space}    }\n`;
    }
  });
  return diffReport;
};

const formatToStylish = (data1, data2, diffData) => {
  let diffReport = addLineStylish(data1, data2, diffData);
  diffReport = addStartEndStylish(diffReport);
  return diffReport;
};

export default formatToStylish;
