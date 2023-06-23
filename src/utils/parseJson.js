export const parseJson = (dataFile) => {
  try {
    return JSON.parse(dataFile);
  } catch (error) {
    throw new Error(`Failed to parse the JSON data from file ${dataFile}.`);
  }
};
