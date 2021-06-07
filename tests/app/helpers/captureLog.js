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
