const winston = require('winston');
require('winston-daily-rotate-file');

var loggerOptions = {};
var siemLoggerOptions = {};

export async function setLoggerOptions(options) {
    loggerOptions = options;
}

export async function getLogger() {
    try {
        loggerOptions["filename"] = 'webapigateway-%DATE%.log';
        return winston.createLogger({
            transports: [
                new winston.transports.DailyRotateFile(loggerOptions)
            ]
        });
    } catch (error) {
        console.log("error in getLogger() : " + error.message)
    }
}