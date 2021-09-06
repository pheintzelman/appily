import { add, update, get, getAll, remove } from '../db/{{modelNameCamel}}';
import { NotFoundError } from "../lib/Error";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function add{{modelNamePascal}}({{modelNameCamel}}) {
  await sleep(1000);
  return await add({{modelNameCamel}});
}

export async function get{{modelNamePascal}}(id) {
  await sleep(1000);

  if (!id) {
    return null;
  }

  const {{modelNameCamel}} = await get(id);
  if(!{{modelNameCamel}}){
    throw NotFoundError();
  }

  return {{modelNameCamel}};
}

export async function get{{pluralModelNamePascal}}() {
  await sleep(1000);

  return await getAll();
}

export async function update{{modelNamePascal}}(id, {{modelNameCamel}}) {
  await sleep(1000);
  return await update(id, {{modelNameCamel}});
}

export async function remove{{modelNamePascal}}(id) {
  await sleep(1000);

  if (!id) {
    return null;
  }

  return await remove(id);
}
