import _ from 'lodash';

const generateDiffMap = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)];
  const uniqueKeys = _.sortBy(Array.from(new Set(keys)), (key) => key);

  return uniqueKeys.reduce((map, key) => {
    const hasInData1 = Object.hasOwn(data1, key);
    const hasInData2 = Object.hasOwn(data2, key);
    const value1 = hasInData1 ? data1[key] : '';
    const value2 = hasInData2 ? data2[key] : '';
    const isSameValues = (hasInData1 && hasInData2) ? _.isEqual(value1, value2) : false;

    if (hasInData1 && !hasInData2) {
      map.set(key, 'deleted');
    } else if (!hasInData1 && hasInData2) {
      map.set(key, 'added');
    } else if (hasInData1 && hasInData2 && isSameValues) {
      map.set(key, 'unchanged');
    } else if (_.isObject(value1) && _.isObject(value2)) {
      map.set(key, generateDiffMap(value1, value2));
    } else {
      map.set(key, 'changed');
    }
    return map;
  }, new Map());
};

export default generateDiffMap;
