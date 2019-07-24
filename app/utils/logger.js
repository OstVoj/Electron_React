const { remote } = require('electron');
const fs = require('fs');
const logger = require('electron-log');

const { app } = remote;
const logFilePath = `${app.getPath('home')}/adam602/logs/applog.txt`;

logger.transports.file.level = 'silly';
logger.transports.console.format = '{y}{m}{d}.{h}{i}{s} {text}';
logger.transports.file.format = '{y}{m}{d}.{h}{i}{s} {text}';
logger.transports.file.file = logFilePath;
logger.transports.file.maxSize = 10 * 1024 * 1024;

const log = (message: string) => {
  logger.info(message);
};

const readLogs = () => fs.readFileSync(logFilePath);

export default {
  log,
  readLogs
};
