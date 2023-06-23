import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const finalPath = path.resolve(filePath);
  try {
    return fs.readFileSync(finalPath, 'utf8').trim();
  } catch (err) {
    throw new Error(`Error reading file at ${finalPath}: ${err.message}`);
  }
};
export default readFile;
