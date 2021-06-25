import { withStore } from './db';
const { add, get, set, deleteRecord, getAll } = withStore(
  '{{modelNamePascal}}'
);

export { get, add, set, deleteRecord, getAll };
