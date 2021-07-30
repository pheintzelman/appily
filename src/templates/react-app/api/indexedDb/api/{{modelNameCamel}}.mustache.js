import { add, get, set, getAll } from '../db/{{modelNameCamel}}';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function add{{modelNamePascal}}({{modelNameCamel}}) {
  await sleep(1000);
  return await add({{modelNameCamel}});
}

export async function update{{modelNamePascal}}(id, {{modelNameCamel}}) {
  await sleep(1000);
  return await set(id, {{modelNameCamel}});
}

export async function get{{modelNamePascal}}(id) {
  await sleep(1000);

  if (!id) {
    return null;
  }

  return await get(id);
}

export async function get{{pluralModelNamePascal}}() {
  await sleep(1000);

  return await getAll();
}
