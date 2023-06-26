import _ from 'lodash';

const addStartEndStylish = (diffReport) => `{\n${diffReport}}`;

const SPACE_NAMBER = 4;
const getFormatObject = (obj, spaceNumber = 0) => {
  if (!_.isObject(obj)) {
    return `${obj}\n`;
  }

  const space = ' '.repeat(spaceNumber);
  const innerSpace = ' '.repeat(spaceNumber + SPACE_NAMBER);

  const diffReport = Object.entries(obj).reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return [...acc, `${innerSpace}    ${key}: ${getFormatObject(value, spaceNumber + SPACE_NAMBER)}`];
    } else {
      return [...acc, `${innerSpace}    ${key}: ${value}\n`];
    }
  }, []);

  return ['{\n', ...diffReport, `${space}    }\n`].join('');
};

const addLineStylish = (data1, data2, diffData, spaceNumber = 0) => {
  const diffReport = [];
  const space = ' '.repeat(spaceNumber);
  diffData.forEach((diffValue, diffKey) => {
    const value1 = Object.hasOwn(data1, diffKey)
      ? data1[diffKey]
      : 'ERROR';
    const value2 = Object.hasOwn(data2, diffKey)
      ? data2[diffKey]
      : 'ERROR';

    if (diffValue === 'deleted') {
      diffReport.push(`${space}  - ${diffKey}: ${getFormatObject(value1, spaceNumber)}`);
    } else if (diffValue === 'added') {
      diffReport.push(`${space}  + ${diffKey}: ${getFormatObject(value2, spaceNumber)}`);
    } else if (diffValue === 'unchanged') {
      diffReport.push(`${space}    ${diffKey}: ${getFormatObject(value1, spaceNumber)}`);
    } else if (diffValue === 'changed') {
      diffReport.push(`${space}  - ${diffKey}: ${getFormatObject(value1, spaceNumber)}`);
      diffReport.push(`${space}  + ${diffKey}: ${getFormatObject(value2, spaceNumber)}`);
    } else {
      diffReport.push(`${space}    ${diffKey}: {\n`);
      diffReport.push(addLineStylish(value1, value2, diffValue, spaceNumber + SPACE_NAMBER));
      diffReport.push(`${space}    }\n`);
    }
  });
  return diffReport.join('');
};

const formatToStylish = (data1, data2, diffData) => {
  return addStartEndStylish(addLineStylish(data1, data2, diffData));
};

export default formatToStylish;
