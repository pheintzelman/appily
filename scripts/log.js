import { compareObjects } from '../tests/helpers/compareObjects.js';

function splitLogMessage(logMessage) {
  const re = /(?=(?:TRACE|DEBUG|INFO|WARN|ERROR) \[\d{13}\] \(.*\):)/g;
  const matches = [...logMessage.matchAll(re)];
  if (matches.length > 1) {
    return logMessage.split(re);
  }

  return [logMessage];
}

function flattenLog(log) {
  return log.reduce((acc, logMessage) => {
    return [...acc, ...splitLogMessage(logMessage)];
  }, []);
}

export function cleanLog(log) {
  return flattenLog(log).map((line) => {
    const meta = line.split(':');
    const message = meta.splice(1).join(':');
    const level = meta[0].split(' ')[0];
    return `${level}:${message}`;
  });
}

export function sortLog(log) {
  const logCopy = [...log];
  return logCopy.sort(compareObjects);
}
