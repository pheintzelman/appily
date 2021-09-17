import { Type } from './error.js';
import { StatusCodes } from 'http-status-codes';

export function errorHandler(error, request, response, next) {
  console.log('Error Handling Middleware called');
  console.log('Path: ', request.path);
  console.error(error);

  if (error.type == Type.IdNotUnique) {
    return response.status(StatusCodes.BAD_REQUEST).send('Id is not unique.');
  }

  if (error.type == Type.NotFound) {
    return response.status(StatusCodes.NOT_FOUND).send('Record not found.');
  }

  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Server failed.');
}
