import { withStore } from './db';
const { add, get, getAll, update, remove } = withStore('{{modelNamePascal}}');

export { add, get, getAll, update, remove };
