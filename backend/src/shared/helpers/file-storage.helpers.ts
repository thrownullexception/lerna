import * as fs from 'fs';
import * as util from 'util';
import { v4 as uuidv4 } from 'uuid';
import * as multer from 'multer';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const makeTargetDirectory = (targetDir: string): string => {
  targetDir = `public/${targetDir}`;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  return targetDir;
};

export const FileStorageHelpers = (targetDir = 'uploads') =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, makeTargetDirectory(targetDir));
    },
    filename: (req, file, cb) => {
      const fileExtension = file.originalname.split('.').pop();
      const filename = `${uuidv4()}.${fileExtension}`;
      cb(null, filename);
    },
  });

export const getFileAndStore = async (
  pathToFile: string,
  targetDir = 'uploads',
): Promise<string> => {
  targetDir = makeTargetDirectory(targetDir);
  const filename = `${uuidv4()}.png`;
  // Need to fix for external files
  const file = await readFile(pathToFile);
  await writeFile(`${targetDir}/${filename}`, file);
  return filename;
};
