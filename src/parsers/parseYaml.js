import yaml from 'js-yaml';

const parseYaml = (dataFile) => {
  try {
    return yaml.load(dataFile);
  } catch (error) {
    throw new Error(`Failed to parse the YAML data from file ${dataFile}.`);
  }
};
export default parseYaml;
