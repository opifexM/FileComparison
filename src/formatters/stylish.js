import _ from 'lodash';

const addStartEndStylish = (diffReport) => `{\n${diffReport}}`;

const SPACE_INCREMENT = 4;
const getFormatObject = (obj, spaceNumber = 0) => {
  if (!_.isObject(obj)) {
    return `${obj}\n`;
  }

  const space = ' '.repeat(spaceNumber);
  const innerSpace = ' '.repeat(spaceNumber + SPACE_INCREMENT);
  const diffReport = Object.entries(obj).reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return [...acc, `${innerSpace}    ${key}: ${getFormatObject(value, spaceNumber + SPACE_INCREMENT)}`];
    }
    return [...acc, `${innerSpace}    ${key}: ${value}\n`];
  }, []);
  return ['{\n', ...diffReport, `${space}    }\n`].join('');
};

const addLineStylish = (data1, data2, diffData, spaceNumber = 0) => {
  const space = ' '.repeat(spaceNumber);
  const innerSpace = ' '.repeat(spaceNumber + SPACE_INCREMENT);

  const diffReport = Array.from(diffData.entries()).reduce((acc, [diffKey, diffValue]) => {
    const value1 = Object.hasOwn(data1, diffKey) ? data1[diffKey] : 'ERROR';
    const value2 = Object.hasOwn(data2, diffKey) ? data2[diffKey] : 'ERROR';

    if (diffValue === 'deleted') {
      return [...acc, `${space}  - ${diffKey}: ${getFormatObject(value1, spaceNumber)}`];
    }
    if (diffValue === 'added') {
      return [...acc, `${space}  + ${diffKey}: ${getFormatObject(value2, spaceNumber)}`];
    }
    if (diffValue === 'unchanged') {
      return [...acc, `${space}    ${diffKey}: ${getFormatObject(value1, spaceNumber)}`];
    }
    if (diffValue === 'changed') {
      return [
        ...acc,
        `${space}  - ${diffKey}: ${getFormatObject(value1, spaceNumber)}`,
        `${space}  + ${diffKey}: ${getFormatObject(value2, spaceNumber)}`,
      ];
    }

    const nestedLines = addLineStylish(value1, value2, diffValue, spaceNumber + SPACE_INCREMENT);
    return [
      ...acc,
      `${innerSpace}${diffKey}: {\n`,
      nestedLines,
      `${innerSpace}}\n`,
    ];
  }, []);

  return diffReport.join('');
};

const formatToStylish = (data1, data2, diffData) => addStartEndStylish(addLineStylish(data1, data2, diffData));

export default formatToStylish;
