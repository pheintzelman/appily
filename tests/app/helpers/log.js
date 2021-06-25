import { jest } from '@jest/globals';
import { logger } from '../../../src/logger.js';

export function captureLog(log) {
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
}

// Sorting the log is needed, to make test consistent
// TODO makes this handle object/object
export function sortLog(log) {
  return log.sort((logItem1, logItem2) => {
    const [key1, value1] = Object.entries(logItem1)[0];
    const [key2, value2] = Object.entries(logItem2)[0];

    if (value1 === value2) {
      return 0;
    }

    return value1 > value2 ? 1 : -1;
  });
}
