import path from 'path';
import { readdir, stat, unlink } from 'fs/promises';
import logger from '../utils/logger';
import appConfig from '../config/general.config';

/*
The objective of this scheduled task is to periodically delete the files in temporary upload folder.
There are multiple ways a file upload can get stuck in our filesystem, such as:
- Failed the express-validation middleware
- Failed the user/auth validation
- Failed the mime type check (if there's any)
- Failed s3 uploads
- Failed storing to DB
- Other things/validations that might happen
So to mimimize codes that are needed to cleaning up the files, it's centralized here so we don't have to care
for these temporary files, since it will only live at most (INTERVAL + GRACE_PERIOD) minutes in our fs
*/
const intervalUploadFolderCleanup = async () => {
  const tempDocFolder = path.resolve(
    __dirname,
    `../../../${appConfig.TEMP_UPLOAD_FOLDER}`,
  );
  const files = await readdir(tempDocFolder);
  const currentTime = Date.now();
  let totalDeletedFileCount = 0;
  let totalFreedSpace = 0;
  for (let index = 0; index < files.length; index++) {
    const filePath = `${tempDocFolder}/${files[index]}`;
    const fileStat = await stat(filePath);
    const { atime: lastAccessTime, size } = fileStat;
    const diffWithNowInSeconds = Math.abs(
      (currentTime - lastAccessTime.getTime()) / 1000,
    );
    if (
      diffWithNowInSeconds >
      appConfig.SCHEDULER_UPLOAD_FOLDER_CLEANUP_INACTIVITY_PERIOD
    ) {
      try {
        await unlink(filePath);
        totalDeletedFileCount++;
        totalFreedSpace += size / 1024;
      } catch (error) {
        logger.error(error);
      }
    }
  }
  logger.info(
    `Cleanup done, total deleted files: ${totalDeletedFileCount} files. Total freed space: ${totalFreedSpace.toFixed(
      0,
    )} KB`,
  );
};

export default {
  intervalUploadFolderCleanup,
};
