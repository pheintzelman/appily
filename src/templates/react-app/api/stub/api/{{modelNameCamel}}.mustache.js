function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function add{{modelNamePascal}}({{modelNameCamel}}) {
  await sleep(1000);
  throw Error('Not implemented');
}

export async function get{{modelNamePascal}}(id) {
  await sleep(1000);
  throw Error('Not implemented');
}

export async function get{{pluralModelNamePascal}}() {
  await sleep(1000);
  throw Error('Not implemented');
}

export async function update{{modelNamePascal}}(id, {{modelNameCamel}}) {
  await sleep(1000);
  throw Error('Not implemented');
}

export async function remove{{modelNamePascal}}(id) {
  await sleep(1000);
  throw Error('Not implemented');
}