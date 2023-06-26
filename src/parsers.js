import _ from 'lodash';

const getDiffData = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)];
  const uniqueKeys = Array
    .from(new Set(keys))
    .slice()
    .sort((a, b) => a.localeCompare(b));
  const diffMap = new Map();

  for (let i = 0; i < uniqueKeys.length; i += 1) {
    const key = uniqueKeys[i];
    const hasInData1 = Object.hasOwn(data1, key);
    const hasInData2 = Object.hasOwn(data2, key);
    const value1 = hasInData1 ? data1[key] : '';
    const value2 = hasInData2 ? data2[key] : '';
    const isSameValues = (hasInData1 && hasInData2) ? _.isEqual(value1, value2) : false;

    if (hasInData1 && !hasInData2) {
      diffMap.set(key, 'deleted');
    } else if (!hasInData1 && hasInData2) {
      diffMap.set(key, 'added');
    } else if (hasInData1 && hasInData2 && isSameValues) {
      diffMap.set(key, 'unchanged');
    } else if (_.isObject(value1) && _.isObject(value2)) {
      diffMap.set(key, getDiffData(value1, value2));
    } else {
      diffMap.set(key, 'changed');
    }
  }
  return diffMap;
};

export default getDiffData;
