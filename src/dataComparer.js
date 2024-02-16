import _ from 'lodash';

const generateDiffMap = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)];
  const uniqueKeys = _.sortBy(Array.from(new Set(keys)), (key) => key);

  return uniqueKeys.reduce((map, key) => {
    const hasInData1 = Object.hasOwn(data1, key);
    const hasInData2 = Object.hasOwn(data2, key);
    if (hasInData1 && !hasInData2) {
      map.set(key, 'deleted');
      return map;
    }
    if (!hasInData1 && hasInData2) {
      map.set(key, 'added');
      return map;
    }

    const value1 = hasInData1 ? data1[key] : '';
    const value2 = hasInData2 ? data2[key] : '';
    const isSameValues = (hasInData1 && hasInData2) ? _.isEqual(value1, value2) : false;
    if (isSameValues) {
      map.set(key, 'unchanged');
      return map;
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      map.set(key, generateDiffMap(value1, value2));
      return map;
    }
    map.set(key, 'changed');
    return map;
  }, new Map());
};

export default generateDiffMap;
