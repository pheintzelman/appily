export const Type = {
  BadRequest: "BadRequest",
  NotFound: "NotFound",
  IdNotUnique: "IdNotUnique",
};

export function IdNotUnique(action, subject, id) {
  const error = new Error(`Id already exists: ${subject}, ${id} in ${action}`);
  error.type = Type.IdNotUnique;
  return error;
}

export function NotFound(action, subject, id) {
  const error = new Error(`Record not found: ${subject}, ${id} in ${action}`);
  error.type = Type.NotFound;
  return error;
}
