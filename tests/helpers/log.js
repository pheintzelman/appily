import { jest } from '@jest/globals';
import { isObject } from '../../src/lib/check.js';
import { objectMap } from '../../src/lib/objectMap.js';
import { logger } from '../../src/logger.js';
import { compareObjects } from './compareObjects.js';

export function captureLog() {
  const log = [];

  const mockTrace = jest.spyOn(logger, 'trace');
  mockTrace.mockImplementation((msg) => log.push({ TRACE: msg }));

  const mockDebug = jest.spyOn(logger, 'debug');
  mockDebug.mockImplementation((msg) => log.push({ DEBUG: msg }));

  const mockInfo = jest.spyOn(logger, 'info');
  mockInfo.mockImplementation((msg) => log.push({ INFO: msg }));

  const mockWarn = jest.spyOn(logger, 'warn');
  mockWarn.mockImplementation((msg) => log.push({ WARN: msg }));

  const mockError = jest.spyOn(logger, 'error');
  mockError.mockImplementation((msg) => log.push({ ERROR: msg }));

  const mockFatal = jest.spyOn(logger, 'fatal');
  mockFatal.mockImplementation((msg) => log.push({ FATAL: msg }));

  return log;
}

export function sortLog(log) {
  const logCopy = [...log];
  return logCopy.sort(compareObjects);
}

function removeProjectDirString(entry) {
  if (typeof entry !== 'string') {
    return entry;
  }

  return entry.replace(/(\/.*\/)(appily)/, '$2');
}

function removeProjectDirHelper(entry) {
  if (Array.isArray(entry)) {
    return entry.map(removeProjectDirHelper);
  }

  if (isObject(entry)) {
    return objectMap(entry, removeProjectDirHelper);
  }

  return removeProjectDirString(entry);
}

export function removeProjectDir(log) {
  return log.map((entry) => {
    return removeProjectDirHelper(entry);
  });
}
