import {
  ToadScheduler,
  SimpleIntervalJob,
  JobStatus,
  AsyncTask,
} from 'toad-scheduler';
import appConfig from '../config/general.config';

import logger from './logger';
import schedulerService from '../services/scheduler.service';

const scheduler = new ToadScheduler();

export function registerSchedulers() {
  const uploadFolderCleanupJob = new SimpleIntervalJob(
    {
      seconds: appConfig.SCHEDULER_UPLOAD_FOLDER_CLEANUP_INTERVAL,
      runImmediately: true,
    },
    new AsyncTask(
      appConfig.SCHEDULER_UPLOAD_FOLDER_CLEANUP_TASK_ID,
      schedulerService.intervalUploadFolderCleanup,
      (err: Error) => {
        logger.error(`Error with Upload Folder Cleanup task: ${err.message}`);
      },
    ),
    {
      id: appConfig.SCHEDULER_UPLOAD_FOLDER_CLEANUP_TASK_ID,
      preventOverrun: false,
    },
  );
  scheduler.addSimpleIntervalJob(uploadFolderCleanupJob);
  logger.info(
    `Job ${appConfig.SCHEDULER_UPLOAD_FOLDER_CLEANUP_TASK_ID} registered`,
  );
}

export function startJob(jobId: string) {
  logger.info(`Starting Job ${jobId}`);
  scheduler.startById(jobId);
}
export function stopJob(jobId: string) {
  logger.info(`Stopping Job ${jobId}`);
  scheduler.stopById(jobId);
}

export function getStatus(jobId: string) {
  try {
    const status = scheduler.getById(jobId).getStatus();
    return status;
  } catch (error) {
    logger.error('Job Not Found');
    return 'stopped' as JobStatus;
  }
}
