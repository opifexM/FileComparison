import _ from 'lodash';

const getKeyWithParent = (parent, key) => ((parent.length > 0) ? `${parent}.${key}` : key);

const getFormatObject = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  }
  if (_.isString(obj)) {
    return `'${obj}'`;
  }
  return obj;
};

const addLinePlain = (data1, data2, diffData, parent = '') => {
  let diffReport = '';
  diffData.forEach((diffValue, diffKey) => {
    const value1 = Object.hasOwn(data1, diffKey)
      ? data1[diffKey]
      : 'ERROR';
    const value2 = Object.hasOwn(data2, diffKey)
      ? data2[diffKey]
      : 'ERROR';

    if (diffValue === 'deleted') {
      diffReport = `${diffReport}Property '${getKeyWithParent(parent, diffKey)}' was removed\n`;
    } else if (diffValue === 'added') {
      diffReport = `${diffReport}Property '${getKeyWithParent(parent, diffKey)}' was added with value: ${getFormatObject(value2)}\n`;
    } else if (diffValue === 'changed') {
      diffReport = `${diffReport}Property '${getKeyWithParent(parent, diffKey)}' was updated. From ${getFormatObject(value1)} to ${getFormatObject(value2)}\n`;
    } else {
      if (diffValue !== 'unchanged') {
        diffReport += addLinePlain(value1, value2, diffValue, getKeyWithParent(parent, diffKey));
      }
    }
  });
  return diffReport;
};

const formatToPlain = (data1, data2, diffData) => addLinePlain(data1, data2, diffData);

export default formatToPlain;
