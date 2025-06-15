// logger.js
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const os = require('os');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/api-logs.json');

function logRequest(req, res, next) {
  const start = process.hrtime();
  const logEntry = {
    id: uuidv4(),
    utcTime: new Date().toISOString(),
    apiName: 'UserAPI',
    operationName: req.route?.path || req.path,
    hostName: os.hostname(),
    httpMethod: req.method,
    path: req.originalUrl,
    resourceId: req.params.id || null,
    clientName: req.headers['x-client-name'] || 'UnknownClient',
    userId: req.user?.id || null,
    correlationId: req.headers['x-correlation-id'] || uuidv4(),
    sessionId: req.headers['x-session-id'] || uuidv4(),
  };

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const ms = diff[0] * 1000 + diff[1] / 1e6;
    logEntry.statusCode = res.statusCode;
    logEntry.millisecondsTaken = ms.toFixed(2);

    if (res.statusCode >= 400) {
      logEntry.error = {
        errorCode: 'ERR_' + res.statusCode,
        errorId: uuidv4(),
        message: res.statusMessage
      };
    }

    writeLog(logEntry);
  });

  next();
}

function writeLog(entry) {
  fs.appendFile(logFilePath, JSON.stringify(entry) + '\n', err => {
    if (err) console.error('Failed to write log:', err);
  });
}

module.exports = logRequest;
