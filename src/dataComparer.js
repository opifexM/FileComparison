import _ from 'lodash';

const generateDiffMap = (data1, data2) => {
  const uniqueKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return uniqueKeys.reduce((map, key) => {
    const hasInData1 = _.has(data1, key);
    const hasInData2 = _.has(data2, key);
    if (hasInData1 && !hasInData2) {
      map.set(key, 'deleted');
      return map;
    }
    if (!hasInData1 && hasInData2) {
      map.set(key, 'added');
      return map;
    }

    const value1 = _.get(data1, key, '');
    const value2 = _.get(data2, key, '');
    if (_.isEqual(value1, value2)) {
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
