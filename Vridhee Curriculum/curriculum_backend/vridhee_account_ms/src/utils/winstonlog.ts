const winston = require('winston');
require('winston-daily-rotate-file');
import { configData } from './config'
var loggerOptions: any = configData.logger_options;



loggerOptions["filename"] = 'authorization-%DATE%.log';
export const logger = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile(loggerOptions)
    ]
});
