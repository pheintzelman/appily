export const ErrorType = { NotFound: "NotFound" };

export function NotFoundError() {
  const error = new Error("Record Not Found");
  error.type = ErrorType.NotFound;
  return error;
}
